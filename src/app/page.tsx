import { Claims, getSession } from "@auth0/nextjs-auth0";
import UploadForm from "@/components/UploadForm";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import prisma from "@/db";
import { oxygen } from "@/fonts";
import GoToElement from "@/components/GoToElement";
import { ReactNode } from "react";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  // await prisma.image.create({
  //   data: {
  //     target: 20000,
  //     targetUrl: "UM_W8hLbM6o",
  //     url: "f459e4d1-d249-4584-9683-cbc948283578",
  //     owner: "google-oauth2|110796351868528693245",
  //     expiredDate: new Date(),
  //     title: "ffas",
  //     description: "asff",
  //     revealDirection: "bom",
  //   },
  // });

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col gap-24">
        <HeaderSection />
        <UploadSectionComponent sub={user?.sub} />
        <UseCaseSectionComponent />
        <TutorialSectionComponent />
      </div>
    </>
  );
}
function HeaderSection() {
  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row  lg:justify-around">
      <div className="w-72 sm:w-96 xl:w-128 flex flex-col justify-center gap-2">
        <h1 className={`${oxygen.className} text-4xl sm:text-6xl`}>
          Reveal Your Image
        </h1>
        <p className="text-xl sm:text-2xl">
          Unlock Engagement Rewards with Your Audience
        </p>
        <div className="flex gap-2">
          <GoToElement
            className={` text-xl sm:text-2xl btn rounded`}
            targetId="upload-form"
          >
            Reveal Image
          </GoToElement>

          <GoToElement
            className={` text-xl sm:text-2xl btn rounded`}
            targetId="learn-section"
          >
            Learn More
          </GoToElement>
        </div>

        <div></div>
      </div>
      <div>
        <Image
          src="/likeReveal.gif"
          alt="Reveal gif"
          width="500"
          height="500"
          className="w-72 sm:w-96 xl:w-128"
          priority={true}
        />
      </div>
    </div>
  );
}
function UploadSectionComponent({ sub }: { sub: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div id="upload-form" className="flex flex-col items-center gap-1">
        <h2 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          Ready to Reveal?
        </h2>
        <div className="text-lg sm:text-xl text-center w-10/12 lg:w-8/12">
          Upload your image, set a goal, and optionally{" "}
          <a href="/api/auth/login" className="underline">
            Sign In
          </a>{" "}
          to take control of your reveals and manage your images.
        </div>
      </div>
      <UploadForm sub={sub} />
    </div>
  );
}
function TutorialSectionComponent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <h1 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          Getting Started with Revealationship
        </h1>
        <p className="text-lg sm:text-xl text-center w-10/12 lg:w-8/12">
          Here's a simple guide to using Revealationship to engage your
          audience.
        </p>
      </div>
      <TutorialItemComponent
        isReverse={true}
        title="Upload"
        imgUrl="/uploadTutor.gif"
      >
        Begin by uploading your image in the form section{" "}
        <GoToElement targetId="upload-form" className="underline">
          here
        </GoToElement>
        .
      </TutorialItemComponent>
      <TutorialItemComponent title="Share" imgUrl="/shareTutor.gif">
        Share your image with your audience, and let them know about your
        exciting goal.
      </TutorialItemComponent>

      <TutorialItemComponent
        isReverse={true}
        title="Manage"
        imgUrl="/manageTutor.gif"
      >
        If you're signed in, you can easily manage your images, edit goals, or
        remove them.
      </TutorialItemComponent>
    </div>
  );
}
function TutorialItemComponent({
  isReverse,
  title,
  children,
  imgUrl,
}: {
  isReverse?: boolean;
  title: string;
  children: ReactNode;
  imgUrl: string;
}) {
  return (
    <div className={`flex flex-col items-center lg:flex-row lg:justify-around`}>
      <div>
        <Image
          src={imgUrl}
          alt="Tutorial"
          width={500}
          height={500}
          className="w-72 sm:w-96 xl:w-128 shadow shadow-black"
        />
      </div>
      <div className="py-1 lg:py-0"></div>
      <div
        className={`w-72 sm:w-96 xl:w-128 flex flex-col justify-center gap-1  ${
          isReverse ? "lg:order-first" : "order-none"
        }`}
      >
        <h3 className={`${oxygen.className} text-xl sm:text-2xl`}>{title}</h3>
        <p className="text-md sm:text-lg">{children}</p>
      </div>
    </div>
  );
}

function UseCaseSectionComponent() {
  return (
    <div className="flex flex-col gap-6" id="learn-section">
      <div className="flex flex-col items-center gap-1">
        <h1 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          How You Can Use Revealationship
        </h1>
        <p className="text-lg sm:text-xl text-center w-10/12 lg:w-8/12">
          Revealationship offers a platform to boost your audience engagement by
          offering exciting rewards.
        </p>
      </div>
      <div className="flex justify-around flex-wrap">
        <UseCaseItemComponent
          title="Face Reveal"
          subTitle="Share your face with your audience when your video reaches a specific like threshold."
          imgUrl="/faceReveal.png"
        />
        <UseCaseItemComponent
          title="Artictic Reveals"
          subTitle="Join the trend of sharing your artwork and revealing it based on likes."
          imgUrl="/artReveal.png"
        />
      </div>
    </div>
  );
}

function UseCaseItemComponent({
  title,
  subTitle,
  imgUrl,
}: {
  title: string;
  subTitle: string;
  imgUrl: string;
}) {
  return (
    <>
      <div className="flex flex-col text-center">
        <Image
          src={imgUrl}
          width="500"
          height="500"
          alt="Use Case Reveal"
          className="w-48 sm:w-64 xl:w-72 "
        />
        <div className="w-48 sm:w-64 xl:w-72">
          <div className={`${oxygen.className} text-md sm:text-lg`}>
            {title}
          </div>
          <div className="text-md sm:text-lg">{subTitle}</div>
        </div>
      </div>
    </>
  );
}
