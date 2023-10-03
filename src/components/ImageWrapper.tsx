"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongDownIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/solid";
type ImageWrapperProps = {
  percentageProgress: string;
  percentageProgressLeft: string;
  imgUrl: string;
  revealDirection: string;
};
const getAbsolutePos = (
  revealDirection: string,
  percentageProgress: string,
  percentageProgressLeft: string
) => {
  let style1, className1, style2, className2;

  switch (revealDirection) {
    case "bottom":
      style1 = { height: `${percentageProgress}%` };
      className1 = "bottom-0 left-0 right-0";
      style2 = {
        height: `${percentageProgressLeft}%`,
        top: `${percentageProgressLeft}%`,
      };
      className2 = "left-0 right-0";
      break;

    case "top":
      style1 = { height: `${percentageProgress}%` };
      className1 = "top-0 left-0 right-0";
      style2 = {
        height: `${percentageProgressLeft}%`,
        bottom: `${percentageProgressLeft}%`,
      };
      className2 = "left-0 right-0";
      break;

    case "left":
      style1 = { width: `${percentageProgress}%` };
      className1 = "bottom-0 left-0 top-0";
      style2 = {
        width: `${percentageProgressLeft}%`,
        right: `${percentageProgressLeft}%`,
      };
      className2 = "top-0 bottom-0";
      break;

    case "right":
      style1 = { width: `${percentageProgress}%` };
      className1 = "bottom-0 right-0 top-0";
      style2 = {
        width: `${percentageProgressLeft}%`,
        left: `${percentageProgressLeft}%`,
      };
      className2 = "top-0 bottom-0";
      break;

    default:
      // Handle other cases or return some default values
      break;
  }

  return {
    style1,
    className1,
    style2,
    className2,
  };
};

export default function ImageWrapper({
  percentageProgress,
  percentageProgressLeft,
  imgUrl,
  revealDirection,
}: ImageWrapperProps) {
  const [reveal, setReveal] = useState(false);
  let percentage = "100";
  let percentage2 = "0";
  if (reveal) {
    percentage = percentageProgress;
    percentage2 = percentageProgressLeft;
  }
  const absolutePos = getAbsolutePos(revealDirection, percentage, percentage2);

  return (
    <>
      <div
        className="absolute right-0 left-0 top-0 h-full cursor-pointer"
        onClick={() => {
          setReveal((currentVal) => {
            return !currentVal;
          });
        }}
      ></div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setReveal((currentVal) => {
            return !currentVal;
          });
        }}
      >
        <div
          style={absolutePos.style1}
          className={`${absolutePos.className1} bg-stone-900 absolute shadow-md shadow-black rounded transition-all duration-700`}
        >
          <div
            className={`text-center transition-opacity ${
              reveal && "opacity-0"
            }`}
          >
            Tap to reveal
          </div>
        </div>
        <div
          className={`${absolutePos.className2} bg-stone-800 absolute shadow-md shadow-black rounded transition-all duration-700`}
          style={absolutePos.style2}
        ></div>
      </div>
    </>
  );
}
