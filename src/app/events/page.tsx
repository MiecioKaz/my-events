import Event from "@/components/Event";
import prisma from "@/lib/db";

export type EventData = {
  id: string;
  title: string;
  person: string;
  datetime: string;
  category: string;
  description: string;
  period: string;
};

const EventsPage = async () => {
  const events = await prisma.event.findMany();

  if (!events) {
    return (
      <h1 className="text-2xl text-red-800 text-center">
        Something wrong happened
      </h1>
    );
  }

  const futureEvents = events.filter((item) => item.period === "future");
  futureEvents.sort(
    (firstEvent, secondEvent) =>
      Date.parse(firstEvent.datetime) - Date.parse(secondEvent.datetime)
  );
  const pastEvents = events.filter((item) => item.period === "past");
  pastEvents.sort(
    (firstEvent, secondEvent) =>
      Date.parse(firstEvent.datetime) - Date.parse(secondEvent.datetime)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      <div>
        <h1 className="text-center text-xl font-bold dark:text-white">
          Future Events
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 content-start min-h-[800px] p-8 bg-slate-50 dark:bg-slate-400">
          {futureEvents.length ? (
            futureEvents.map((futureEvent) => (
              <Event
                key={futureEvent.id}
                event={futureEvent}
              />
            ))
          ) : (
            <h1 className="lg:col-span-2 text-center text-2xl font-semibold italic text-red-600 mt-[300px]">
              No Future Events to display
            </h1>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-center text-xl font-bold dark:text-white">
          Past Events
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 content-start min-h-[800px] p-8 bg-lime-50 dark:bg-lime-200">
          {pastEvents.length ? (
            pastEvents.map((pastEvent) => (
              <Event
                key={pastEvent.id}
                event={pastEvent}
              />
            ))
          ) : (
            <h1 className="lg:col-span-2 text-center text-2xl font-semibold italic text-red-600 mt-[300px]">
              No Past Events to display
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventsPage;
