import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import Filters from "@/components/home/Filters";
import { getProcedures } from "@/lib/actions/procedure.action";
import Procedure from "@/components/procedures/Procedure";
import { getServerSession } from "next-auth";
import { options } from "@/app/(auth)/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Empty from "@/components/shared/EmptySection";

const Procedures = async () => {
  const session = await getServerSession(options);

  const result = await getProcedures({});
  const admin = session?.user?.role === "admin";

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Procedury medyczne</h1>
        {session?.user?.role === "admin" ? (
          <Link
            href="/procedures/add"
            className="flex justify-end max-sm:w-full"
          >
            <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
              Dodaj procedurę
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search-outline.svg"
          placeholder="Szukaj procedury"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <Filters filters={HomePageFilters} />
      <div className="mt-1 flex w-full flex-col gap-6">
        {result.procedures.length > 0 ? (
          result.procedures.map((procedure) => (
            <Procedure
              key={procedure._id}
              desc={procedure.desc}
              _id={procedure._id}
              title={procedure.title}
              src={procedure.image}
              createdAt={procedure.createdAt}
              role={admin}
            />
          ))
        ) : (
          <Empty title="Nie mamy jeszcze opublikowanych procedur" />
        )}
      </div>
    </>
  );
};

export default Procedures;
