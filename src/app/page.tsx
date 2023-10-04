import { Claims, getSession } from "@auth0/nextjs-auth0";
import UploadForm from "@/components/UploadForm";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import prisma from "@/db";
import { Oxygen } from "next/font/google";

const oxygen = Oxygen({
  weight: "400",
  subsets: ["latin"],
});

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
        <UploadSectionComponent user={user} />
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
        <p className="text-xl sm:text-2xl">Give User Engagement Rewards</p>
        <div className="">
          <button
            className={`${oxygen.className} text-xl sm:text-2xl btn rounded`}
          >
            Get Started
          </button>
        </div>
      </div>
      <div>
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-72 sm:w-96 xl:w-128"
        />
      </div>
    </div>
  );
}
function UploadSectionComponent(user: Claims) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          Upload Image
        </h2>
        <p className="text-lg sm:text-xl text-center">
          Need Help? Learn more here
        </p>
      </div>
      <UploadForm sub={user?.sub} />
    </div>
  );
}
function TutorialSectionComponent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          How To
        </h1>
        <p className="text-lg sm:text-xl text-center">
          This is step by step on how to upload your image reval
        </p>
      </div>
      <TutorialItemComponent isReverse={true} />
      <TutorialItemComponent />
    </div>
  );
}
function TutorialItemComponent({ isReverse }: { isReverse?: boolean }) {
  return (
    <div className={`flex flex-col items-center lg:flex-row lg:justify-around`}>
      <div>
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-72 sm:w-96 xl:w-128"
        />
      </div>
      <div
        className={`w-72 sm:w-96 xl:w-128 flex flex-col justify-center gap-4 bg-red-800 ${
          isReverse ? "lg:order-first" : "order-none"
        }`}
      >
        <h3 className={`${oxygen.className} text-xl sm:text-2xl`}>
          1. Upload Your Image
        </h3>
        <p className="text-md sm:text-lg">Give User Engagement Rewards</p>
        <div className=""></div>
      </div>
    </div>
  );
}

function UseCaseSectionComponent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`${oxygen.className} text-2xl sm:text-4xl text-center`}>
          Possible use case
        </h1>
        <p className="text-lg sm:text-xl text-center">
          Revealationship provide a platform to get your follower Engagement by
          give them reward
        </p>
      </div>
      <div className="flex justify-around flex-wrap">
        <UseCaseItemComponent />
        <UseCaseItemComponent />
        <UseCaseItemComponent />
      </div>
    </div>
  );
}

function UseCaseItemComponent() {
  return (
    <>
      <div className="flex flex-col text-center">
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-48 sm:w-64 xl:w-72"
        />
        <div className={`${oxygen.className} text-md sm:text-lg`}>Title</div>
        <div className="text-md sm:text-lg">Sub Title</div>
      </div>
    </>
  );
}
