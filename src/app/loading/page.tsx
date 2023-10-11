"use client";

import { useEffect } from "react";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <div className="mx-auto text-center">
        <Image
          src="/Loading2.svg"
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
