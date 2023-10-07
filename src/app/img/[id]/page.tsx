import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineYoutube,
  AiOutlineDownload,
  AiOutlineDelete,
} from "react-icons/ai";

import { Claims, getSession } from "@auth0/nextjs-auth0";
import prisma from "@/db";
import getImgUrl from "@/utils/getImgUrl";
import UploadForm from "@/components/UploadForm";
import ImageWrapper from "@/components/ImageWrapper";
import Navbar from "@/components/Navbar";
import { deleteImage } from "@/actions/deleteImageAction";
import CopyUrlBtn from "@/components/CopyUrlBtn";
import { oxygen } from "@/fonts";
type TimeFormat = "days" | "hours" | "minutes";
function calculateTimeLeft(
  startDate: Date,
  endDate: Date
): { [key: string]: number } {
  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Calculate the number of days left
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate the remaining time in milliseconds after subtracting days
  const remainingTime = timeDifference % (1000 * 60 * 60 * 24);

  // Calculate the number of hours left
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));

  // Calculate the remaining time in milliseconds after subtracting hours
  const remainingTimeAfterHours = remainingTime % (1000 * 60 * 60);

  // Calculate the number of minutes left
  const minutes = Math.floor(remainingTimeAfterHours / (1000 * 60));

  return {
    days: days > 0 ? days : 0,
    hours: hours > 0 ? hours : 0,
    minutes: minutes > 0 ? minutes : 0,
  };
}
async function getEditAuthority(
  userId: string | null,
  user: Claims | undefined
) {
  if (user && user.sub == userId) {
    return true;
  }
  return false;
}

async function getLikes(id: string) {
  const apiKey = process.env.YOTUBE_API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`;
  const response = await fetch(apiUrl, { next: { revalidate: 300 } });
  const data = await response.json();
  const likesCount: number = data.items[0].statistics.likeCount;
  return likesCount;
}

async function getProgress(likesTarget: number, likesCount: number) {
  const progress = likesCount > likesTarget ? 1 : likesCount / likesTarget;
  return progress;
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  const currentUrl = `${process.env.BASE_URL}/img${params.id}`;
  const imgUrl = `http://localhost:3000/api/img/${params.id}`;
  const youtubeBaseUrl = `https://youtu.be/`;
  const imgData = await prisma.image.findFirst({ where: { id: params.id } });
  if (!imgData) {
    return <div>404</div>;
  }
  const isOwner = await getEditAuthority(imgData.owner, user);
  const currentLikesCount = await getLikes(imgData.targetUrl);
  const progress = await getProgress(imgData.target, currentLikesCount);
  // const progress = 1;
  const percentageProgress = (100 - progress * 100).toFixed(2);
  const percentageProgressLeft = (progress * 100).toFixed(2);
  let oriImgUrl;
  if (progress >= 1) {
    oriImgUrl = await getImgUrl(imgData.url);
  }
  const dateNow = new Date();
  const timeLeft = calculateTimeLeft(new Date(), imgData.expiredDate);
  if (
    timeLeft["days"] + timeLeft["hours"] + timeLeft["minutes"] <= 0 &&
    !isOwner
  ) {
    return <div>404</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col gap-4">
        <HeaderSectionComponent
          title={imgData.title}
          description={imgData.description}
        />
        <div className="flex flex-col items-center text-center md:flex-row md:justify-center gap-4">
          <ImageStatsSectionComponent
            percentageProgressLeft={percentageProgressLeft}
            progress={progress}
            targetLikes={imgData.target}
            targetUrl={imgData.targetUrl}
            currentLikesCount={currentLikesCount}
            imgUrl={imgUrl}
            oriImgUrl={oriImgUrl}
            timeLeft={timeLeft}
            youtubeBaseUrl={youtubeBaseUrl}
            imageId={imgData?.id}
            isOwner={isOwner}
          />
          <ImageRevealSectionComponent
            percentageProgress={percentageProgress}
            percentageProgressLeft={percentageProgressLeft}
            revealDirection={imgData.revealDirection}
            imgUrl={imgUrl}
          />
        </div>

        {isOwner && (
          <>
            <UploadForm
              {...imgData}
              sub={imgData.owner}
              method="PUT"
              id={params.id}
            />
          </>
        )}
      </div>
    </>
  );
}

function HeaderSectionComponent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center flex flex-col gap-1">
      <h1 className={`${oxygen.className} text-2xl md:text-6xl `}>{title}</h1>
      <p className="text-lg md:text-2xl">{description}</p>
    </div>
  );
}
function ImageStatsSectionComponent({
  percentageProgressLeft,
  currentLikesCount,
  targetLikes,
  timeLeft,
  imgUrl,
  oriImgUrl,
  progress,
  youtubeBaseUrl,
  targetUrl,
  imageId,
  isOwner,
}: {
  percentageProgressLeft: string;
  currentLikesCount: number;
  targetLikes: number;
  timeLeft: { [key: string]: number };
  imgUrl: string;
  oriImgUrl?: string | null;
  progress: number;
  youtubeBaseUrl: string;
  targetUrl: string;
  imageId: string;
  isOwner: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="w-full bg-stone-600 rounded-full h-2.5">
          <div
            className="bg-stone-900 h-2.5 rounded-full"
            style={{ width: `${percentageProgressLeft}%` }}
          ></div>
        </div>
        <div className={`${oxygen.className} text-2xl md:text-4xl`}>
          {percentageProgressLeft}%
        </div>
        <div className={`text-lg md:text-xl`}>
          {currentLikesCount}/{targetLikes} Likes
        </div>
      </div>
      <div>
        <div className={`text-lg md:text-2xl text-center`}>Time Left</div>
        <div className="text-center flex justify-between gap-4 ">
          {Object.keys(timeLeft).map((key) => {
            return (
              <div>
                <div className={`${oxygen.className} text-2xl m:text-4xl`}>
                  {timeLeft[key]}
                </div>
                <div className={`text-lg md:text-xl`}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <a
            href={`${youtubeBaseUrl}${targetUrl}`}
            target="_blank"
            className="btn flex items-center justify-center gap-1 text-lg md:text-xl"
          >
            <AiOutlineYoutube />
            <div>Watch Video</div>
            {/* <img src="/yt.svg" alt="" /> */}
          </a>
        </div>
        <CopyUrlBtn />
        <div>
          {progress >= 1 ? (
            <a
              href={oriImgUrl ? oriImgUrl : "#"}
              target="_blank"
              className="btn flex items-center justify-center gap-1 text-lg md:text-xl "
            >
              <AiOutlineDownload />
              <div>Download</div>
            </a>
          ) : (
            <>
              <a
                href={imgUrl}
                target="_blank"
                className="btn flex items-center justify-center gap-1 text-lg md:text-xl "
              >
                <AiOutlineDownload />
                <div>Download</div>
              </a>
              {/* <div className="text-lg md:text-2xl">
                    Only {(progress * 100).toFixed(2)}% is revealed!
                  </div> */}
            </>
          )}
        </div>
        {isOwner && (
          <form action={deleteImage}>
            <input type="hidden" name="id" value={imageId} readOnly />
            <input type="hidden" name="path" value={`/`} readOnly />
            <button
              type="submit"
              className="btn flex items-center justify-center gap-1 text-lg md:text-xl w-full"
            >
              <AiOutlineDelete />
              <div>Delete</div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
function ImageRevealSectionComponent({
  imgUrl,
  percentageProgress,
  revealDirection,
  percentageProgressLeft,
}: {
  imgUrl: string;
  percentageProgress: string;
  revealDirection: string;
  percentageProgressLeft: string;
}) {
  return (
    <div className="relative w-max ">
      <Image
        src={`${imgUrl}?r=${percentageProgress}&dir${revealDirection}`}
        alt="Covered Image"
        width={300}
        height={400}
        className="mx-auto shadow shadow-black lg:w-96 w-64"
        priority={true}
        placeholder="blur"
        blurDataURL="/loading2.svg"
      />
      <ImageWrapper
        percentageProgress={percentageProgress}
        percentageProgressLeft={percentageProgressLeft}
        imgUrl={imgUrl}
        revealDirection={revealDirection}
      />
    </div>
  );
}
