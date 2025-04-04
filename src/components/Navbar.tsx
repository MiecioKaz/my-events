import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 z-10 w-full h-20 border-b-[1px] flex justify-between items-center px-2 sm:px-6 bg-inherit">
      <div>
        <span className="w-fit h-fit text-lg sm:text-3xl text-green-500 font-extrabold p-0 bg-purple-700">
          MY
        </span>
        <span className="text-lg sm:text-3xl text-purple-700 font-extrabold bg-green-500">
          EVENTS
        </span>
      </div>
      {user && (
        <Link
          href="/new-event"
          className="text-sm font-bold text-gray-600 dark:text-slate-200 hover:text-amber-600"
        >
          New Event
        </Link>
      )}

      <SignedIn>
        <UserButton />
      </SignedIn>
      <ThemeToggle />
    </div>
  );
};
export default Navbar;
