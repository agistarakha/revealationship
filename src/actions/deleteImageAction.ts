"use server";
import prisma from "@/db";
import { redirect } from "next/navigation";

export async function deleteImage(data: FormData) {
  const id = data.get("id")?.valueOf();
  if (typeof id !== "string") {
    throw Error("Error when deleting data");
  }
  const path = data.get("path")?.valueOf();
  if (typeof path !== "string") {
    throw Error("Error when deleting data");
  }
  try {
    await prisma.image.update({
      where: {
        id,
      },
      data: {
        deleted: new Date(),
      },
    });
    redirect(path);
  } catch (error) {
    throw Error("Failed to delete data");
  }
}
