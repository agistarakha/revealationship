"use server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "../db";
import { getYoutubeId } from "../utils/getYoutubeId";
import getUploadUrl from "../utils/getUploadUrl";
import axios from "axios";

async function updateImageData(
  id: string,
  target: number,
  targetUrl: string,
  expiredDate: number,
  title: string,
  description: string,
  revealDirection: string
) {
  console.log("DB date:" + new Date(expiredDate));
  console.log("Db date str: " + expiredDate);

  const imageData = await prisma.image.update({
    where: { id: id },
    data: {
      target,
      targetUrl,
      expiredDate: new Date(expiredDate),
      title,
      description,
      revealDirection,
    },
  });
  revalidatePath(`/api/img/${imageData.id}`);
  revalidatePath(`/img/${imageData.id}`);

  // redirect(`/img/${imageData.id}`);
}

async function uploadImage(
  imageBuffer: Buffer,
  fileName: string,
  fileType: string
) {
  const uploadUrl = await getUploadUrl(fileName, fileType);
  if (!uploadUrl) {
    redirect("/");
    return;
  }

  // Upload image to aws s3 bucket
  await axios.put(uploadUrl, imageBuffer, {
    headers: {
      "Content-type": fileType,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function imageFormAction(data: FormData) {
  const targetUrl: string = getYoutubeId(
    data.get("targetUrl") as unknown as string
  );
  const target: number = parseInt(data.get("target") as unknown as string);
  const owner: string | null = data.get("owner") as unknown as string | null;
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }

  const description = data.get("description")?.valueOf();
  if (typeof description !== "string") {
    throw new Error("Invalid description");
  }

  const expiredDate = data.get("expiredDate") as unknown as string | null;
  if (!expiredDate) {
    throw new Error("Invalid expiration date");
  }
  const timeStamp = Date.parse(expiredDate);

  const revealDirection = data.get("revealDirection")?.valueOf();
  if (typeof revealDirection !== "string") {
    throw new Error("Invalid revealDirection");
  }
  if (data.get("method") == "PUT") {
    const id = data.get("id")?.valueOf();
    if (typeof id !== "string" || id.length === 0) {
      throw new Error("Invalid id");
    }
    await updateImageData(
      id,
      target,
      targetUrl,
      timeStamp,
      title,
      description,
      revealDirection
    );
  } else {
    const file: File | null = data.get("file") as unknown as File | null;
    if (!file) {
      throw new Error("No file uploaded");
    }
    const fileName = randomUUID();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await uploadImage(buffer, fileName, file.type);

    const imageData = await prisma.image.create({
      data: {
        target,
        targetUrl,
        url: fileName,
        owner,
        expiredDate: new Date(timeStamp),
        title,
        description,
        revealDirection,
      },
    });
    redirect(`/img/${imageData.id}`);
  }
}
