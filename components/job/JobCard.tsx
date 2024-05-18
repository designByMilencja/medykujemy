import { getUserById } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

interface Props {
  id: string;
}

const JobCard = async ({ id }: Props) => {
  const userId = id;
  const user = await getUserById({ userId });
  console.log(user);
  const image = "/assets/images/team.jpg";
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
                <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                  Skontaktuj mnie *
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1"></div>
              <div className="flex items-center gap-1"></div>
              <div className="flex items-center gap-1">
                <div className="rounded-full bg-primary-500 p-1">
                  <Image
                    src="/assets/icons/document.svg"
                    width={20}
                    height={40}
                    alt="ikonka biura firmy"
                  />
                </div>
                <p>Specjalizacja:</p>
                <p className="font-bold">{user.specialization}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="rounded-full bg-primary-500 p-1">
                  <Image
                    src="/assets/icons/folder.svg"
                    width={20}
                    height={40}
                    alt="ikonka biura firmy"
                  />
                </div>
                <p>Typ umowy:</p>
                <p className="font-bold">{user.contractType}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="rounded-full bg-primary-500 p-1">
                  <Image
                    src="/assets/icons/timer-outline.svg"
                    width={20}
                    height={40}
                    alt="ikonka biura firmy"
                  />
                </div>
                <p>Wymiar godzin:</p>
                <p className="font-bold">{user.hours}</p>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
              Doświadczenie:
            </h2>
            <div>{ReactHtmlParser(user.experience)}</div>
          </div>
          <div className="my-5">
            <p>{user.additional}</p>
          </div>
          <p>
            * Zaznaczając <b>"Skontaktuj mnie"</b> zgadzasz się na przekazanie
            informacji o Twoim zainteresowaniu ogłoszeniem pracodawcy
          </p>
        </>
      )}
      {user?.role === "employer" && (
          <>
            <div className="flex w-full flex-col justify-between gap-4">
              <div
                  className="h-[200px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{backgroundImage: `url('${image}')`}}
              ></div>
              <div className="flex w-full items-center justify-between">
                <h1 className="h1-bold text-dark100_light900">
                  {user.companyName}
                </h1>
                <Link href="/" className="flex">
                  <button
                      className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                    Skontaktuj mnie *
                  </button>
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary-500 p-1">
                    <Image
                        src="/assets/icons/time.svg"
                        width={20}
                        height={40}
                        alt="ikonka biura firmy"
                    />
                  </div>
                  <p>Ważne do:</p>
                  <p className="font-bold">13.02.2024</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary-500 p-1">
                    <Image
                        src="/assets/icons/people-outline.svg"
                        width={20}
                        height={40}
                        alt="ikonka biura firmy"
                    />
                  </div>
                  <p>Szukany Zawód:</p>
                  <p className="font-bold">{user.occupation}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary-500 p-1">
                    <Image
                        src="/assets/icons/document.svg"
                        width={20}
                        height={40}
                        alt="ikonka biura firmy"
                    />
                  </div>
                  <p> Szukana Specjalizacja:</p>
                  <p className="font-bold">{user.specialization}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary-500 p-1">
                    <Image
                        src="/assets/icons/folder.svg"
                        width={20}
                        height={40}
                        alt="ikonka biura firmy"
                    />
                  </div>
                  <p>Typ umowy:</p>
                  <p className="font-bold">{user.contractType}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary-500 p-1">
                    <Image
                        src="/assets/icons/timer-outline.svg"
                        width={20}
                        height={40}
                        alt="ikonka biura firmy"
                    />
                  </div>
                  <p>Wymiar godzin:</p>
                  <p className="font-bold">{user.hours}</p>
                </div>
              </div>
            </div>
            <div className="my-5">
              <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
                Zakres obowiązków:
              </h2>
              <div>{ReactHtmlParser(user.responsibilities)}</div>
            </div>
            <div className="my-5">
              <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
                Wymagania:
              </h2>
              <div>{ReactHtmlParser(user.requirements)}</div>
            </div>
            <div className="my-5">
              <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">
                Widełki cenowe wynagrodzenia:
              </h2>
              <div>{user.}</div>
            </div>
            <div className="my-5">{ReactHtmlParser(user.additional)}</div>
            <Link href={user.brandLink} className="flex">
              <button
                  className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                Przejdź do strony firmy
              </button>
            </Link>
            <p className="mt-6">
              * Zaznaczając <b>"Skontaktuj mnie" </b> zgadzasz się na przekazanie
              informacji o Twoim zainteresowaniu ogłoszeniem pracownikowi
            </p>
          </>
      )}
    </div>
  );
};

export default JobCard;
