import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProfileImageItemProps = {
  imageUrl: string;
  imageId: string;
};

export default function ProfileImageItem({
  imageUrl,
  imageId,
}: ProfileImageItemProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  console.log(isImageLoaded);

  return (
    <div className="w-max mx-auto p-2 border border-stone-600 rounded flex flex-col">
      <Image
        onLoadingComplete={() => {
          setIsImageLoaded(true);
        }}
        alt="Preview image"
        src={imageUrl}
        width={2000}
        height={0}
        className="mx-auto md:w-128 w-72"
        priority={true}
      />
      {!isImageLoaded && (
        <Image
          src="/loading2.svg"
          alt="loading gif"
          width={300}
          height={300}
          className="mx-auto"
        />
      )}
      <div className="flex pt-2">
        <Link href={`/img/${imageId}`} className="btn">
          See Details
        </Link>
      </div>
    </div>
  );
}
