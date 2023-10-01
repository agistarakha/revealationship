import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Oxygen } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: "100",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revealationship",
  description: "Reveal your image based on social media likes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`bg-stone-800 text-white ${roboto.className}`}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
