import Article from "@/components/articles/Article";
import Filters from "@/components/home/Filters";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";
import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/actions/article.action";
import { getServerSession } from "next-auth";
import { options } from "@/app/(auth)/api/auth/[...nextauth]/options";
import Empty from "@/components/shared/EmptySection";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

export const metadata: Metadata = {
  title: "Strona główna | Aplikacja Medykuj",
  description:
    "Medykuj to aplikacja mieszcząca oferty pracy i procedury dla zawodów medycznych.",
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const session = await getServerSession(options);
  const admin = session?.user?.role === "admin";

  const articles = await getArticles({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  // @ts-ignore
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Aktualności medyczne</h1>
        {session?.user?.role === "admin" ? (
          <Link href="/articles/add" className="flex justify-end max-sm:w-full">
            <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
              Dodaj artykuł
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
          placeholder="Szukaj artykułu"
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
        {articles.articles.length > 0 ? (
          articles.articles.map((article) => (
            <Article
              key={article._id}
              desc={article.desc}
              _id={article._id}
              title={article.title}
              src={article.image}
              tags={article.tags}
              createdAt={article.createdAt}
              role={admin}
            />
          ))
        ) : (
          <Empty title="Brak artykułów" />
        )}
      </div>
      <div className="mt-10">
        <Pagination isNext={true} pageNumber={12} />
      </div>
    </>
  );
};

export default Home;
