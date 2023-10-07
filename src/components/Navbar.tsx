import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import NavProfile from "./NavProfile";
import { oxygen } from "@/fonts";
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
      <nav className="border-b border-stone-700 flex p-2 gap-2 justify-between items-center">
        <Link href="/" className={oxygen.className}>
          Home
        </Link>
        <NavProfile user={user} />
      </nav>
      <div className="py-4"></div>
    </>
  );
}
