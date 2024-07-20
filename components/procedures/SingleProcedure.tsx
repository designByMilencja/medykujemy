import React from "react";
// import ReactHtmlParser from "react-html-parser";
interface Props {
  title: string;
  description: string;
  sources: {
    _id: string;
    name: string;
  }[];
  src: string;
  video: string;
}

const SingleProcedure = ({
  title,
  sources,
  src,
  video,
  description,
}: Props) => {
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
        <video controls>
          <source src={video} type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
        <div className="my-4 flex flex-col flex-wrap gap-2">
          {sources.map((source) => (
            <li
              className="subtle-medium background-light800_dark300 text-light400_light500 flex  gap-2 rounded-md border-none px-4 py-2 capitalize"
              key={source?._id}
            >
              {source?.name}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProcedure;
