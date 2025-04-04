"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-40 w-full h-fit text-center">
      <h2 className="text-2xl text-red-500">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="border-2 rounded-full p-1 px-2 mt-6 text-blue-700 hover:text-blue-400"
      >
        Try again
      </button>
    </div>
  );
}
