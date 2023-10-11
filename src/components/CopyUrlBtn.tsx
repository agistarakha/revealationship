"use client";
import { useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
export default function CopyUrlBtn() {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 5000);
    }
  }, [clicked]);
  return (
    <div>
      <button
        className="btn  text-lg md:text-xl w-full"
        onClick={(e) => {
          navigator.clipboard.writeText(window.location.href);
          setClicked(true);
        }}
      >
        {clicked ? (
          <div className="flex items-center justify-center gap-1">
            <AiOutlineCheck />
            <div>URL Copied</div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <AiOutlineCopy />
            <div>Copy URL</div>
          </div>
        )}
      </button>
    </div>
  );
}
