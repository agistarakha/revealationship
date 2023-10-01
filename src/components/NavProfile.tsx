import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";

type UserClaimsProps = {
  user?: Claims | undefined;
};

export default function ({ user }: UserClaimsProps) {
  return (
    <div>
      {user ? (
        <button className="flex items-center relative group">
          <p className="text-4xl">|</p>
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full w-10"
          />
          {/* <h2>{user.name}</h2>
              <p>{user.email}</p> */}
          <div
            className="
          scale-y-0 group-focus-within:scale-y-100
          origin-top transition-transform
          flex flex-col align-middle
          absolute -bottom-28 right-0
          p-2 
          bg-stone-800
          border
          border-stone-600
          rounded
          shadow
          z-10
          "
          >
            <a href="/api/auth/logout" className="btn">
              Logout
            </a>
            <Link href={`/profile/${user.sub}`} className="btn">
              Profile
            </Link>
          </div>
        </button>
      ) : (
        <a href="/api/auth/login" className="btn">
          Sign Up
        </a>
      )}
    </div>
  );
}
