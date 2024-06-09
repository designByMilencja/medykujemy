import React from "react";
import Link from "next/link";
import Tag from "../shared/Tag";

interface Props {
  _id: string;
  title: string;
  desc: string;
  tags: {
    _id: string;
    name: string;
  }[];
  src: string;
  createdAt: string;
  role?: boolean;
}
const Article = ({ _id, title, tags, src, createdAt, desc, role }: Props) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  // @ts-ignore
  const formattedDate = createdAt.toLocaleDateString("pl-PL", options);
  return (
    <div className="card-wrapper mt-4 flex w-full flex-col rounded-[10px] p-2 sm:px-11">
      {role ? (
        <Link
          href={`/articles/edit/${_id}`}
          className="flex justify-end max-sm:w-full"
        >
          <button className="primary-gradient mt-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
            Edytuj artykuł
          </button>
        </Link>
      ) : (
        ""
      )}
      <div className="mt-2 flex flex-col gap-2">
        <p className="body-regular text-primary-500">{formattedDate}</p>
        <Link href={`/articles/${_id}`}>
          <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
            {title}
          </h2>
        </Link>
        <div
          className="my-1 h-[25vh] w-full max-w-[500px] rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
        <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">
          {desc}
        </p>
        <div className="my-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag _id={tag._id} name={tag.name} key={tag._id} />
          ))}
        </div>
        <Link href={`/articles/${_id}`} className="mb-8 flex">
          <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
            Zobacz artykuł
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Article;
