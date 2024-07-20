import { getUserById } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";
// import ReactHtmlParser from "react-html-parser";
import InfoItem from "./InfoItem";

interface Props {
  id: string;
}

const JobCard = async ({ id }: Props) => {
  const user = await getUserById({ userId: id });
  const image = "/assets/images/biznes.jpg";

  return (
    <div>
      {user?.role === "employee" && (
        <>
          <div className="flex w-full flex-col justify-between gap-4">
            <div
              className="h-[200px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
            <div className="flex w-full items-center justify-between">
              <h1 className="h1-bold text-dark100_light900">
                {user.occupation}
              </h1>
              <Link href="/" className="flex">
                <button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
                  Skontaktuj mnie *
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <InfoItem
                icon="/assets/icons/document.svg"
                label="Specjalizacja"
                value={user.specialization}
              />
              <InfoItem
                icon="/assets/icons/folder.svg"
                label="Typ umowy"
                value={user.contractType}
              />
              <InfoItem
                icon="/assets/icons/timer-outline.svg"
                label="Wymiar godzin"
                value={user.hours}
              />
            </div>
          </div>
          <div className="my-5">
            <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
              Doświadczenie:
            </h2>
            {/* <div className="text-dark100_light900 mt-5"> */}
            {/*  {ReactHtmlParser(user.experience)} */}
            {/* </div> */}
            <div className="text-dark100_light900 mt-5">{user.experience}</div>
          </div>
          <div className="my-5">
            <p className="text-dark100_light900">{user.additional}</p>
          </div>
          <p className="text-dark100_light900">
            * Zaznaczając <b>Skontaktuj mnie *</b> zgadzasz się na przekazanie
            informacji o Twoim zainteresowaniu ofertą użytkownikowi
          </p>
        </>
      )}
      {user?.role === "employer" && (
        <>
          <div className="flex w-full flex-col justify-between gap-4">
            <div
              className="h-[200px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
            <div className="flex w-full items-center justify-between">
              <h1 className="h1-bold text-dark100_light900">
                {user.companyName}
              </h1>
              <Link href="/" className="flex">
                <button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none hover:text-dark-100 dark:text-primary-500 hover:dark:text-white">
                  Skontaktuj mnie *
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <InfoItem
                icon="/assets/icons/time.svg"
                label="Ważne do"
                value="13.02.2024"
              />
              <InfoItem
                icon="/assets/icons/people-outline.svg"
                label="Szukany Zawód"
                value={user.occupation}
              />
              <InfoItem
                icon="/assets/icons/document.svg"
                label="Szukana Specjalizacja"
                value={user.specialization}
              />
              <InfoItem
                icon="/assets/icons/folder.svg"
                label="Typ umowy"
                value={user.contractType}
              />
              <InfoItem
                icon="/assets/icons/timer-outline.svg"
                label="Wymiar godzin"
                value={user.hours}
              />
            </div>
          </div>
          <div className="my-5">
            <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
              Zakres obowiązków:
            </h2>
            {/* <div className="text-dark100_light900 mt-5"> */}
            {/*  {ReactHtmlParser(user.responsibilities)} */}
            {/* </div> */}
            <div className="text-dark100_light900 mt-5">
              {user.responsibilities}
            </div>
          </div>
          <div className="my-5">
            <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
              Wymagania:
            </h2>
            {/* <div className="text-dark100_light900 mt-5"> */}
            {/*  {ReactHtmlParser(user.requirements)} */}
            {/* </div> */}
            <div className="text-dark100_light900 mt-5">
              {user.requirements}
            </div>
          </div>
          <div className="my-5">
            <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
              Wynagrodzenie:
            </h2>
            <div className="text-dark100_light900">
              {user.salary ? user.salary : "-"}
            </div>
          </div>
          {/* <div className="text-dark100_light900 mb-5"> */}
          {/*  {ReactHtmlParser(user.additional)} */}
          {/* </div> */}
          <div className="text-dark100_light900 mb-5">{user.additional}</div>
          <Link href={user.brandLink} className="flex">
            <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
              Przejdź do strony firmy
            </button>
          </Link>
          <p className="text-dark100_light900 mt-6">
            * Zaznaczając <b>Skontaktuj mnie </b> zgadzasz się na przekazanie
            informacji o Twoim zainteresowaniu ofertą użytkownikowi
          </p>
        </>
      )}
    </div>
  );
};

export default JobCard;
