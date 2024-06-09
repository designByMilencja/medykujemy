import { getArticlesByTagName } from "@/lib/actions/article.action";
import Article from "@/components/articles/Article";
import Empty from "@/components/shared/EmptySection";

interface TagPageProps {
  params: {
    tagName: string;
  };
}

const TagPage = async ({ params }: TagPageProps) => {
  const { tagName } = params;
  const articles = await getArticlesByTagName(tagName);

  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">
        Artykuły z kategorii:{" "}
        <span className="text-primary-500">{tagName}</span>
      </h1>
      <div className="mt-1 flex w-full flex-col gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Article
              key={article._id}
              desc={article.desc}
              _id={article._id}
              title={article.title}
              src={article.image}
              tags={article.tags}
              createdAt={article.createdAt}
            />
          ))
        ) : (
          <Empty title="Nie znaleziono artykułów z tej kategorii" />
        )}
      </div>
    </section>
  );
};

export default TagPage;
