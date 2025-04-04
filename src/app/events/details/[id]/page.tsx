import prisma from "@/lib/db";
import { format } from "date-fns";

const DetailsBasicPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const eventData = await prisma.event.findUnique({
    where: { id },
  });
  if (!eventData) {
    return <h1>No Event and event details to display</h1>;
  }

  return (
    <div className="w-1/2 h-fit border-2 rounded-xl p-4 mx-auto mt-40 dark:text-white bg-slate-200 dark:bg-slate-700">
      <div className="flex justify-between">
        <h1 className="font-bold">{eventData.title}</h1>

        <p className="underline underline-offset-2">
          {format(eventData.date, "PP")}
        </p>
      </div>
      <h1 className="text-center font-bold mt-8">Details</h1>
      {eventData.description}
    </div>
  );
};
export default DetailsBasicPage;
