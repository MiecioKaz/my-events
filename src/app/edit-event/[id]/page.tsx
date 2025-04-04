import EditEventForm from "@/components/EditForm";

import prisma from "@/lib/db";

const EditEventPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const eventData = await prisma.event.findUnique({
    where: { id },
  });

  if (!eventData) {
    return <h1 className="mt-40">No events to display</h1>;
  }
  return (
    <div className="w-3/4 sm:w-1/2 h-fit mx-auto mt-28 sm:mt-40 p-4 sm:p-6 bg-slate-100 rounded-2xl shadow-xl dark:bg-slate-500">
      <EditEventForm event={eventData} />
    </div>
  );
};
export default EditEventPage;
