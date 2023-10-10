import prisma from "@/db";
import getImgUrl from "@/utils/getImgUrl";
import ProfileImageList from "@/components/ProfileImageList";
import Navbar from "@/components/Navbar";
import { getSession } from "@auth0/nextjs-auth0";
async function getAllImages(owner: string) {
  "use server";
  const allImages = await prisma.image.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
    },
    where: {
      owner: owner,
      deleted: null,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 4,
  });
  return await Promise.all(
    allImages.map(async (img) => {
      const url = await getImgUrl(img.url);
      if (!url) {
        throw Error("Error when getting url");
      }
      return { ...img, url };
    })
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return <div>404</div>;
  }
  const allImages = await getAllImages(decodeURI(params.id));

  return (
    <>
      <Navbar user={user} />
      <ProfileImageList initialData={allImages} owner={params.id} />
    </>
  );
}
