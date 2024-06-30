import { getServerSession } from "next-auth";
import { options } from "@/app/(auth)/api/auth/[...nextauth]/options";
import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Empty from "@/components/shared/EmptySection";
import { getEvents } from "@/lib/actions/event.action";
import EventCard from "@/components/events/EventCard";

const Page = async () => {
  const session = await getServerSession(options);

  const events = await getEvents({});
  const admin = session?.user?.role === "admin";
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          Nadchodzące wydarzenia
        </h1>

        {session?.user?.role === "admin" ? (
          <Link href="/events/add" className="flex justify-end max-sm:w-full">
            <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
              Dodaj wydarzenie
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="mt-1 flex w-full flex-col gap-6">
        {events.events.length > 0 ? (
          events.events.map((event) => (
            <EventCard
              key={event._id}
              _id={event._id}
              title={event.title}
              desc={event.desc}
              src={event.src}
              date={event.date}
              time={event.time}
              location={event.location}
              role={admin}
            />
          ))
        ) : (
          <Empty title="Obecnie nie mamy zaplanowanych wydarzeń" />
        )}
      </div>
    </>
  );
};

export default Page;
