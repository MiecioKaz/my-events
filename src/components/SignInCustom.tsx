import { SignInButton } from "@clerk/nextjs";

const SignInCustom = () => {
  return (
    <SignInButton>
      <button className="w-fit h-fit text-lg sm:text-2xl font-bold text-white bg-slate-700 border-4 border-teal-400 rounded-full px-2 sm:px-4 py-0 sm:py-2">
        Sign in to begin
      </button>
    </SignInButton>
  );
};
export default SignInCustom;
