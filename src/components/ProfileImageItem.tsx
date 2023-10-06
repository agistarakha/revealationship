import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { deleteImage } from "@/actions/deleteImageAction";

type ProfileImageItemProps = {
  url: string;
  id: string;
  title: string;
  description: string;
};

export default function ProfileImageItem({
  url,
  id,
  title,
  description,
}: ProfileImageItemProps) {
  return (
    <div className="shadow shadow-black w-max mx-auto p-2 border border-stone-700 rounded-lg flex flex-col gap-4">
      {/* {!isImageLoaded && (
        <Image
          src="/loading2.svg"
          alt="loading gif"
          width={300}
          height={300}
          className="mx-auto md:w-128 md:h-128 w-72 h-72 object-contain "
        />
      )} */}
      <Image
        alt="Preview image"
        src={url}
        width={2000}
        height={0}
        className={`self-center md:w-96 sm:w-72 w-48 md:h-96 sm:h-72 h-48 object-cover`}
        priority={true}
        placeholder="blur"
        blurDataURL="/loading2.svg"
      />

      <div className="md:w-96 sm:w-72 w-48">
        <div className="w-full truncate">{title}</div>
        <div className="w-full truncate">{description}</div>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/img/${id}`}
          className="btn flex items-center justify-center gap-1 text-lg md:text-xl "
        >
          <AiOutlineEye />
          <div>See Details</div>
        </Link>
        <form action={deleteImage}>
          <input type="hidden" name="id" value={id} readOnly />
          <input type="hidden" name="path" value={`/`} readOnly />
          <button
            type="submit"
            className="btn flex items-center justify-center gap-1 text-lg md:text-xl w-full"
          >
            <AiOutlineDelete />
            <div>Delete</div>
          </button>
        </form>
      </div>
    </div>
  );
}
