import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-200 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-red-700 mt-6">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
};
