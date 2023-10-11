"use client";

import { useEffect } from "react";
import Image from "next/image";
export default function Page() {
  // useEffect(() => {
  //   const footer = document.querySelector("footer");
  //   footer?.remove();
  // }, []);
  return (
    <>
      <div className="mx-auto text-center">
        <Image
          src="/loading2.svg"
          width={500}
          height={500}
          alt="loading animation"
          className="mx-auto"
        />
        <h1 className="text-2xl">Loading Page...</h1>
      </div>
    </>
  );
}
