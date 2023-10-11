"use client";
import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import ImageWrapper from "@/components/ImageWrapper";
import { oxygen } from "@/fonts";
import { AiOutlineLike } from "react-icons/ai";

export default function Page() {
  const [file, setFile] = useState<File | undefined>();
  const [percentage, setPercentage] = useState(50);
  const imageRef = useRef(null);
  const [revealDirection, setRevealDirection] = useState("bottom");
  const percentageLeft = 100 - percentage;
  const imgUrl = file ? URL.createObjectURL(file) : "";
  const imageComponent = useMemo(() => {
    if (file) {
      return (
        <Image
          ref={imageRef}
          src={imgUrl}
          width={200}
          height={0}
          alt="Preview Image"
          className="shadow shadow-black md:w-64 w-48"
          placeholder="blur"
          blurDataURL="/loading2.svg"
          style={{ height: "auto" }}
        />
      );
    }
    return null;
  }, [file]);

  return (
    <>
      <div className="flex flex-col w-full">
        <label className={`${oxygen.className} block text-lg`}>
          Upload Image
        </label>
        <div>
          <div className="flex flex-col">
            <label htmlFor="revealDirection">Reveal Direction</label>
            <select
              name="revealDirection"
              id="revealDirection"
              className="form-input"
              required
              value={revealDirection}
              onChange={(e) => {
                setRevealDirection(e.target.value);
              }}
            >
              <option value="bottom">bottom</option>
              <option value="top">top</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </div>
          <div className="flex justify-center gap-1">
            <input
              type="range"
              id="percentage"
              name="percentage"
              min="0"
              max="100"
              step={1}
              onChange={(e) => {
                setPercentage(parseInt(e.target.value));
              }}
            />
            <label htmlFor="percentage">{percentage}</label>
          </div>
        </div>
        <input
          className="form-input"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          accept="image/*"
          required
        />
      </div>
      {file ? (
        <div className="flex flex-col gap-2 text-center">
          <div>Preview</div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <div className="relative w-max">
              {imageComponent}
              <ImageWrapper
                percentageProgress={percentageLeft.toString()}
                percentageProgressLeft={percentage.toString()}
                revealDirection={revealDirection}
                imgUrl={imgUrl}
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-stone-600 p-4 text-4xl w-96">
              <AiOutlineLike />
              <div>{percentage * 5}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
