"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Page() {
  const [file, setFile] = useState<File | undefined>();
  const imgUrl = file ? URL.createObjectURL(file) : "";

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="revealDirection">Reveal Direction</label>
        <select
          name="revealDirection"
          id="revealDirection"
          className="bg-stone-700"
        >
          <option value="bottom">bottom</option>
          <option value="top">top</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Upload Image</label>
        <input
          className="block w-full text-xs bg-stone-700 placeholder:bg-stone-900"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          accept="image/*"
        />
        <br />
        {file ? (
          <Image
            src={imgUrl}
            width={200}
            height={0}
            alt="Preview Image"
            placeholder="blur"
            blurDataURL="/loading2.svg"
            className="mx-auto"
            style={{ height: "auto" }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
