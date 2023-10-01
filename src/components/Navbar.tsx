import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import NavProfile from "./NavProfile";
type User = {
  picture: string;
  name: string;
  sub: string;
};
type NavbarProps = {
  user?: Claims;
};

export default function ({ user }: NavbarProps) {
  return (
    <>
      <nav className="border border-stone-700 flex p-2 gap-2 justify-between items-center">
        <Link href="/" className="">
          Home
        </Link>
        <NavProfile user={user} />
      </nav>
      <div className="py-4"></div>
    </>
  );
}
