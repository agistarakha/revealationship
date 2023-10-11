import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";

type UserClaimsProps = {
  user?: Claims | undefined;
};

export default function NavProfile({ user }: UserClaimsProps) {
  return (
    <div>
      {user ? (
        <button className="flex items-center relative group">
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full w-10"
          />
          {/* <h2>{user.name}</h2>
              <p>{user.email}</p> */}
          <div
            style={{ bottom: "-108px" }}
            className="
            bg-stone-800
          scale-y-0 group-focus-within:scale-y-100
          origin-top transition-transform
          flex flex-col align-middle 
          absolute right-0
          w-28
          py-2 
          border
          border-stone-700
          rounded
          shadow shadow-black
          z-20
          "
          >
            <a href="/api/auth/logout" className="py-1 hover:bg-stone-700">
              Logout
            </a>
            <Link
              href={`/profile/${user.sub}`}
              className="py-1 hover:bg-stone-700"
            >
              My Reveal
            </Link>
          </div>
        </button>
      ) : (
        <div className="p-1">
          <a href="/api/auth/login" className="btn">
            Sign In
          </a>
        </div>
      )}
    </div>
  );
}
