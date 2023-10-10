"use server";
import prisma from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function deleteImage(data: FormData) {
  const id = data.get("id")?.valueOf();
  if (typeof id !== "string") {
    throw Error("Error when deleting data");
  }
  const path = data.get("path")?.valueOf();
  if (typeof path !== "string") {
    throw Error("Error when deleting data");
  }
  await prisma.image.update({
    where: {
      id,
    },
    data: {
      deleted: new Date(),
    },
  });

  revalidatePath(path);
  redirect(path);
}
