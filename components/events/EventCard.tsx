import React from "react";
// import ReactHtmlParser from "react-html-parser";
import Image from "next/image";
import Link from "next/link";

interface Props {
  _id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  src: string;
  location: string;
  role: boolean;
}

const EventCard = ({
  _id,
  title,
  date,
  time,
  location,
  desc,
  src,
  role,
}: Props) => {
  return (
    <div className="card-wrapper mt-4 flex w-full flex-col rounded-[10px] p-2 sm:px-11">
      {role ? (
        <Link
          href={`/events/edit/${_id}`}
          className="flex justify-end max-sm:w-full"
        >
          <button className="primary-gradient mt-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
            Edytuj wydarzenie
          </button>
        </Link>
      ) : (
        ""
      )}
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-primary-500 p-1">
            <Image
              src="/assets/icons/calendar.svg"
              width={20}
              height={20}
              alt="ikonka biura firmy"
            />
          </div>
          <p className="font-bold">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-primary-500 p-1">
            <Image
              src="/assets/icons/time.svg"
              width={20}
              height={20}
              alt="ikonka biura firmy"
            />
          </div>
          <p className="font-bold">{time}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-primary-500 p-1">
            <Image
              src="/assets/icons/location.svg"
              width={20}
              height={20}
              alt="ikonka biura firmy"
            />
          </div>
          <p className="font-bold">{location}</p>
        </div>
        <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
          {title}
        </h2>
        <div
          className="my-1 h-[25vh] w-full max-w-[500px] rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
        {/* <div className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify"> */}
        {/*  {ReactHtmlParser(desc)} */}
        {/* </div> */}
        <div className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">
          {desc}
        </div>
        <p className="mb-1">
          Serdecznie zapraszamy do dołączenia do wydarzenia, zapisy mailowe pod
          adresem: kontakt@medykuj.pl
        </p>
        <p className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-center text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          Zapisz się
        </p>
      </div>
    </div>
  );
};

export default EventCard;
