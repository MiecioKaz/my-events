import { SignedOut } from "@clerk/nextjs";
import SignInCustom from "@/components/SignInCustom";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/events");
  }
  return (
    <div className="w-screen h-screen grid place-content-center bg-gradient-to-tr from-transparent from-60% via-sky-200 via-80% dark:bg-none">
      <SignedOut>
        <SignInCustom />
      </SignedOut>
    </div>
  );
}
