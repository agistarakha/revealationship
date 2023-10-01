"use client";

import { useEffect, useRef, useState } from "react";

type ImageWrapperProps = {
  percentageProgress: string;
  percentageProgressLeft: string;
  imgUrl: string;
};
// const getAbsolutePos = (revealDirection: string) => {

//   switch (revealDirection) {
//     case "top":
//       return 't';
//     case "right":
//       return {
//         top: 0,
//         left: -revealedAreaSize,
//       };
//     case "left":
//       return {
//         top: 0,
//         left: revealedAreaSize,
//       };
//     default:
//       return {

//       };
//   }
// };

export default function ImageWrapper({
  percentageProgress,
  percentageProgressLeft,
  imgUrl,
}: ImageWrapperProps) {
  const [reveal, setReveal] = useState(false);
  let percentage = "100";
  let percentage2 = "0";
  if (reveal) {
    percentage = percentageProgress;
    percentage2 = percentageProgressLeft;
  }

  return (
    <>
      <div
        className="absolute right-0 left-0 top-0 h-full"
        onClick={() => {
          setReveal((currentVal) => {
            return !currentVal;
          });
        }}
      ></div>
      <div
        className="bg-blue-600"
        onClick={() => {
          setReveal((currentVal) => {
            return !currentVal;
          });
        }}
      >
        <div
          style={{ height: `${percentage}%` }}
          className="bg-stone-900 absolute right-0 left-0 bottom-0 shadow-md shadow-black rounded transition-height duration-700"
        >
          <p className="text-center">Click to reveal</p>
        </div>
        <div
          className="bg-stone-800 absolute right-0 left-0 shadow-md shadow-black rounded transition-topheight duration-700"
          style={{
            height: `${percentage2}%`,
            top: `${percentage2}%`,
          }}
        ></div>
      </div>
    </>
  );
}
