"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImageItem from "./ProfileImageItem";
type ProfileImageListProps = {
  initialData: Array<{
    url: string;
    id: string;
    title: string;
    description: string;
  }>;
  owner: string;
};

export default function ProfileImageList({
  initialData,
  owner,
}: ProfileImageListProps) {
  const [images, setImages] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/img?page=${page}&owner=${owner}`
      );
      const data: any[] = await response.json();
      if (data.length === 0) {
        setIsLastPage(true);
        return;
      }

      setImages((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (isLastPage) {
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image) => (
        <ProfileImageItem {...image} />
      ))}
      {isLoading && (
        <Image
          src="/loading2.svg"
          alt="loading gif"
          width={100}
          height={100}
          className="mx-auto"
        />
      )}
      {error && <p>Error: {error.message}</p>}
      {/* <Image src="/loading3.gif" alt="loading gif" width={100} height={100} /> */}
    </div>
  );
}
