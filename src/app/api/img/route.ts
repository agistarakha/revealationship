import prisma from "@/db";
import getImgUrl from "@/utils/getImgUrl";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseQueryParams(queryString: string): Record<string, string> {
  const queryParams: Record<string, string> = {};
  const queryParts = queryString.slice(1).split("&"); // Remove the leading "?" and split by "&"

  for (const part of queryParts) {
    const [key, value] = part.split("=");
    queryParams[key] = decodeURIComponent(value);
  }

  return queryParams;
}

const imagePerPage: number = 4;
export async function GET(req: NextRequest) {
  const queryString = req.nextUrl.search;
  const queryParams = parseQueryParams(queryString);
  const page = parseInt(queryParams["page"]);
  const owner = queryParams["owner"];
  const data = await prisma.image.findMany({
    skip: imagePerPage * page,
    take: imagePerPage,
    where: {
      owner,
      deleted: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedData = await Promise.all(
    data.map(async (img) => {
      const url = await getImgUrl(img.url);
      if (!url) {
        throw Error("Error when getting url");
      }
      return { ...img, url };
    })
  );

  return NextResponse.json(formattedData);
}
