"use client";

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild={true} />
      <DialogOverlay className="bg-transparent">
        <DialogContent
          aria-describedby={undefined}
          className="overflow-y-hidden dark:bg-white"
        >
          <DialogTitle>Details</DialogTitle>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
export default Modal;
