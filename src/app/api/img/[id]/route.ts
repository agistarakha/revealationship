import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import getImgUrl from "@/utils/getImgUrl";
import { cookies } from "next/headers";

function getOffsetOptions(
  direction: string,
  revealedAreaSize: number
): { top: number; left: number } {
  switch (direction) {
    case "top":
      return {
        top: revealedAreaSize,
        left: 0,
      };
    case "right":
      return {
        top: 0,
        left: -revealedAreaSize,
      };
    case "left":
      return {
        top: 0,
        left: revealedAreaSize,
      };
    default:
      return {
        top: revealedAreaSize,
        left: 0,
      };
  }
}

async function getLikes(id: string) {
  const apiKey = process.env.YOTUBE_API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`;
  const response = await fetch(apiUrl, { next: { revalidate: 300 } });
  const data = await response.json();
  const likesCount: number = data.items[0].statistics.likeCount;
  return likesCount;
}

async function getCoveredImage(
  originalImg: sharp.Sharp,
  progress: number,
  revealDirection: string
) {
  // Get the metadata (dimensions) of the original image
  const originalImgMetadata = await originalImg.metadata();
  let originalImgWidth = originalImgMetadata.width;
  let originalImgHeight = originalImgMetadata.height;
  originalImgWidth =
    typeof originalImgWidth === "number" ? originalImgWidth : 0;
  originalImgHeight =
    typeof originalImgHeight === "number" ? originalImgHeight : 0;

  // Create an overlay image with the same dimensions as original image
  const overlayImage = await sharp({
    create: {
      width: originalImgWidth,
      height: originalImgHeight,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  }).toBuffer();

  const revealedAreaSize: number =
    originalImgHeight - Math.floor(originalImgHeight * (1 - progress));
  const { top, left } = getOffsetOptions(revealDirection, revealedAreaSize);
  //   Composite the original image with the overlay
  const newImg = await originalImg
    .composite([
      {
        input: overlayImage,
        gravity: "northwest", // Position of the overlay
        raw: {
          width: originalImgWidth,
          height: originalImgHeight,
          channels: 3,
        },
        top: top,
        left: left,
      },
    ])
    .toBuffer();

  return newImg;
}

async function getOriginalImage(filename: string) {
  let imgUrl = await getImgUrl(filename);
  if (!imgUrl) {
    return null;
  }

  const imageRequest = await fetch(imgUrl);
  const originalImgBuffer = await imageRequest.arrayBuffer();
  // Get original image
  const originalImg = sharp(originalImgBuffer);
  return originalImg;
}

async function getProgress(likesTarget: number, targetUrl: string) {
  const likesCount = await getLikes(targetUrl);
  const progress = likesCount > likesTarget ? 1 : likesCount / likesTarget;
  return progress;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const imageData = await prisma.image.findFirst({ where: { id: params.id } });
  if (!imageData) {
    return "";
  }
  const progress = await getProgress(imageData.target, imageData.targetUrl);
  const originalImg = await getOriginalImage(imageData.url);
  if (!originalImg) {
    return "";
  }
  const newImg = await getCoveredImage(
    originalImg,
    progress,
    imageData.revealDirection
  );
  const headers = new Headers();
  headers.set("Content-Type", "image/*");
  return new NextResponse(newImg, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
