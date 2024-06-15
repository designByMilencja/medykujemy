import Link from "next/link";
import Tag from "./Tag";
import { getLastAddedArticles } from "@/lib/actions/article.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const articles = await getLastAddedArticles();
  const tags = await getTopPopularTags();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[300px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden xl:w-[400px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Ostatnio dodane</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/articles/${article._id}`}
              className="flex cursor-pointer items-start justify-between"
            >
              <p className="body-medium text-dark500_light700">
                {article.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popularne tematy</h3>
        <div className="mt-7 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
