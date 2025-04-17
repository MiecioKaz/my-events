import { revalidatePath } from "next/cache";
import Link from "next/link";
import type { EventData } from "@/app/events/page";
import { format } from "date-fns";
import prisma from "@/lib/db";

const Event = ({ event }: { event: EventData }) => {
  const handleDelete = async (id: string) => {
    "use server";

    const result = await prisma.event.delete({
      where: { id },
    });
    if (!result) {
      throw new Error("Somethig went wrong! Event not deleted!");
    } else revalidatePath("/events");
  };

  const handleCompleted = async (id: string) => {
    "use server";

    const result = await prisma.event.update({
      where: { id },
      data: { period: "past" },
    });
    if (!result) {
      throw new Error("Somethig went wrong! Event not completed!");
    } else {
      revalidatePath("/events");
    }
  };

  return (
    <div className="aspect-square bg-white dark:bg-slate-100 rounded-lg shadow-md grid grid-cols-2 content-between p-2">
      <div className="place-self-start text-nowrap underline underline-offset-2 text-fuchsia-950">
        {/* {format(event.datetime, "PP")} */}
        {event.datetime.slice(0, 10)}
      </div>
      <Link
        href={`/events/details/${event.id}`}
        className="place-self-end border-2 rounded-full px-1 text-sm bg-teal-200 hover:bg-teal-400"
      >
        Details
      </Link>
      <div className="col-span-2 place-self-center text-lg text-center font-bold">
        {event.title}
      </div>

      {event.period === "future" && (
        <>
          <form
            action={async () => {
              "use server";
              await handleCompleted(event.id);
            }}
            className="col-span-2 place-self-center border-2 rounded-full px-1 text-sm bg-amber-200 hover:bg-amber-400"
          >
            <button>Completed</button>
          </form>

          <Link
            href={`/edit-event/${event.id}`}
            className="place-self-start border-2 rounded-full px-1 text-sm bg-sky-200 hover:bg-sky-400"
          >
            Edit
          </Link>
        </>
      )}

      <form
        action={async () => {
          "use server";
          await handleDelete(event.id);
        }}
        className={`${
          event.period === "past"
            ? "col-span-2 place-self-center"
            : "place-self-end"
        } border-2 rounded-full px-1 text-sm bg-red-400 hover:bg-red-600`}
      >
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};
export default Event;
