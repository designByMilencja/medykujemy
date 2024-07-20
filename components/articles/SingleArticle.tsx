import React from "react";
import Tag from "../shared/Tag";
// import ReactHtmlParser from "react-html-parser";

interface Props {
  title: string;
  description: string;
  tags: {
    _id: string;
    name: string;
  }[];
  src: string;
}
const SingleArticle = ({ title, tags, src, description }: Props) => {
  return (
    <div className="card-wrapper mt-4 flex w-full flex-col gap-5 rounded-[10px] p-2 sm:px-11 md:items-center">
      <div className="mt-8 flex flex-col gap-2">
        <h1 className="h1-bold text-dark100_light900">{title}</h1>
        <div
          className="h-[25vh] w-full max-w-[500px] rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
        {/* <div className="body-regular text-dark500_light700 my-1.5 max-w-[500px] flex-1 text-justify ">{ReactHtmlParser(description)}</div> */}
        <div className="body-regular text-dark500_light700 my-1.5 max-w-[500px] flex-1 text-justify ">
          {description}
        </div>
        <div className="my-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag _id={tag._id} name={tag.name} key={tag._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
