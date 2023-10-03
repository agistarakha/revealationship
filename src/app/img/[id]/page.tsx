import Image from "next/image";
import Link from "next/link";
import { Claims, getSession } from "@auth0/nextjs-auth0";
import prisma from "@/db";
import getImgUrl from "@/utils/getImgUrl";
import UploadForm from "@/components/UploadForm";
import ImageWrapper from "@/components/ImageWrapper";
import Navbar from "@/components/Navbar";
import { deleteImage } from "@/actions/deleteImageAction";
import { Oxygen } from "next/font/google";
const oxygen = Oxygen({
  weight: "400",
  subsets: ["latin"],
});
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
  const imgUrl = `http://localhost:3000/api/img/${params.id}`;
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
  // console.log(`${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes`);

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className={`${oxygen.className} text-2xl md:text-6xl `}>
            {imgData.title}
          </h1>
          <p className="text-lg md:text-2xl">{imgData.description}</p>
        </div>
        <div className="flex flex-col items-center text-center md:flex-row md:justify-center gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <div className="bg-red-900 rounded-full">
                <div
                  className="bg-stone-900 h-2 rounded-full"
                  style={{ width: `${percentageProgressLeft}%` }}
                ></div>
              </div>
              <div className={`${oxygen.className} text-2xl md:text-6xl`}>
                {percentageProgressLeft}%
              </div>
              <div className={`text-lg md:text-2xl`}>
                {currentLikesCount}/{imgData.target} Likes
              </div>
            </div>
            <div>
              <div className={`text-lg md:text-2xl text-center`}>Time Left</div>
              <div className="text-center flex justify-between gap-4 md:gap-0">
                {Object.keys(timeLeft).map((key) => {
                  return (
                    <div>
                      <div
                        className={`${oxygen.className} text-2xl m:text-6xl`}
                      >
                        {timeLeft[key]}
                      </div>
                      <div className={`text-lg md:text-2xl`}>{key}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {progress >= 1 ? (
                <a
                  href={oriImgUrl ? oriImgUrl : "#"}
                  target="_blank"
                  className="btn block text-center"
                >
                  Download
                </a>
              ) : (
                <>
                  <a
                    href={imgUrl}
                    target="_blank"
                    className="btn block text-center"
                  >
                    Download
                  </a>
                  <div className="text-lg md:text-2xl">
                    Only {(progress * 100).toFixed(2)}% is revealed!
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="relative w-max ">
            <Image
              src={`${imgUrl}?r=${percentageProgress}&dir${imgData.revealDirection}`}
              alt="Covered Image"
              width={300}
              height={400}
              className="mx-auto shadow-sm shadow-black lg:w-96 w-64"
              priority={true}
              placeholder="blur"
              blurDataURL="/loading2.svg"
            />
            <ImageWrapper
              percentageProgress={percentageProgress}
              percentageProgressLeft={percentageProgressLeft}
              imgUrl={imgUrl}
              revealDirection={imgData.revealDirection}
            />
          </div>
        </div>

        {isOwner && (
          <UploadForm
            {...imgData}
            sub={imgData.owner}
            method="PUT"
            id={params.id}
          />
        )}
        <form action={deleteImage}>
          <input type="hidden" name="id" value={imgData.id} readOnly />
          <input type="hidden" name="path" value={`/`} readOnly />
          <button type="submit">Delete</button>
        </form>
      </div>
    </>
  );
}
