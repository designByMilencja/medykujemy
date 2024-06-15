import { getServerSession } from "next-auth";
import { options } from "@/app/(auth)/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { ParamsProps } from "@/types";
import { getEventById } from "@/lib/actions/event.action";
import CreateEditEvent from "@/components/events/CreateEditEvent";

const Page = async ({ params }: ParamsProps) => {
  const session = await getServerSession(options);
  if (!session || session?.user?.role !== "admin") {
    redirect("/sign-in");
  }
  const result = await getEventById({ eventId: params.id });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Edycja wydarzenia</h1>
      </div>
      <div className="mt-9">
        <CreateEditEvent type="edit" eventDetails={JSON.stringify(result)} />
      </div>
    </>
  );
};

export default Page;
