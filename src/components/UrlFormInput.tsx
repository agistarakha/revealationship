"use client";
import { getYoutubeId } from "@/utils/getYoutubeId";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type UrlFormInputProps = {
  targetUrl?: string;
  youtubeBaseUrl: string;
};

export default function UrlFormInput({
  targetUrl,
  youtubeBaseUrl,
}: UrlFormInputProps) {
  const [videoUrl, setVideoUrl] = useState(
    targetUrl ? `${youtubeBaseUrl}${targetUrl}` : ""
  );
  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
  //   null
  // );
  const typingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(videoUrl);

  const youtubeEmbedBaseUrl = "https://www.youtube.com/embed/";
  const videoEmbed = useMemo(() => {
    if (youtubeEmbedUrl == youtubeEmbedBaseUrl || youtubeEmbedUrl === "") {
      return "";
    }
    return (
      <iframe
        className="w-full p-1"
        width="560"
        height="315"
        src={youtubeEmbedUrl}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  }, [youtubeEmbedUrl]);
  useEffect(() => {
    const youtubeVideoId = getYoutubeId(videoUrl);
    setYoutubeEmbedUrl(youtubeEmbedBaseUrl + youtubeVideoId);
  }, []);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVideoUrl(value);
    // Clear the previous typing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout.current);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      const youtubeVideoId = getYoutubeId(value);
      setYoutubeEmbedUrl(youtubeEmbedBaseUrl + youtubeVideoId);
    }, 1000); // Adjust the delay (in milliseconds) as needed
    typingTimeout.current = newTimeout;
  };

  return (
    <>
      <div className="text-stone-200 w-full text-clip pb-2">
        <h2 className="text-xs md:text-md">Supported URL formats:</h2>
        <ul className=" list-disc list-inside text-xs md:text-md ">
          <li>https://youtu.be/[videoId]</li>
          <li>https://www.youtube.com/watch?v=[videoId]</li>
          <li>https://www.youtube.com/embed/[videoId]</li>
          <li>https://www.youtube.com/v/[videoId]</li>
          <li>
            https://www.youtube.com/watch?feature=player_embedded&v=[videoId]
          </li>
        </ul>
      </div>
      <input
        placeholder="YouTube video URL"
        className="form-input peer"
        type="text"
        name="targetUrl"
        id="targetUrl"
        min={1}
        value={videoUrl}
        onChange={handleInputChange}
        required
      />

      {videoEmbed}
    </>
  );
}
