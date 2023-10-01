import { getSession } from "@auth0/nextjs-auth0";
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
      <div className="flex flex-col gap-8">
        <div className="flex justify-around">
          <div className="flex flex-col justify-center gap-2">
            <h1 className={`${oxygen.className} text-6xl`}>
              Reveal Your Image
            </h1>
            <p className="text-2xl">Give User Engagement Rewards</p>
            <div className="">
              <button className={`${oxygen.className} text-2xl btn rounded`}>
                Get Started
              </button>
            </div>
          </div>
          <div>
            <img src="https://placehold.co/600x400" alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className={`${oxygen.className} text-4xl text-center`}>
              Upload Image
            </h2>
            <p className="text-xl text-center">Need Help? Learn more here</p>
          </div>
          <UploadForm sub={user?.sub} />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className={`${oxygen.className} text-4xl text-center`}>
              How To
            </h1>

            <p className="text-xl text-center">
              This is step by step on how to upload your image reval
            </p>
          </div>
          <SectionComponent isReverse={true} />
          <SectionComponent />
        </div>
      </div>
    </>
  );
}

function SectionComponent({ isReverse }: { isReverse?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex gap-4 justify-center ${
          isReverse && "flex-row-reverse"
        }`}
      >
        <div className="flex flex-col justify-center gap-4 ">
          <h3 className={`${oxygen.className} text-2xl`}>
            1. Upload Your Image woyyyyyyyyyyyyyyyyyyy
          </h3>
          <p className="text-lg">Give User Engagement Rewards</p>
          <div className=""></div>
        </div>
        <div>
          <img src="https://placehold.co/600x400" alt="" />
        </div>
      </div>
    </div>
  );
}
