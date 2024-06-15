import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
  user: {
    _id: string;
    companyName?: string;
    city: string;
    occupation?: string;
    specialization?: string;
    hours?: string;
    salary?: string;
    role: string;
  };
}

const UserCard = async ({ user }: Props) => {
  return (
    <>
      {user.role === "employee" && (
        <div className="card-wrapper mt-2 flex w-full flex-col rounded-[10px] px-11 py-2">
          <div className="flex-end mt-4 flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <p className="body-regular text-primary-500"> {user.city} </p>
              <p>
                <b>{user.hours}</b>
              </p>
            </div>
            <h3 className="h3-bold text-dark200_light900 mb-2 line-clamp-1">
              Użytkownik Medykuj
            </h3>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/nurse.png"
                width={60}
                height={60}
                alt="ikonka pielęgniarki"
                className="bg-primary-500 object-contain"
              />
              <div className="flex flex-col gap-0.5">
                <p> Zawód: </p>
                <p className="font-bold">{user.occupation}</p>
                <p className="font-bold">{user.specialization}</p>
              </div>
            </div>
            <Link href={`/jobs/${user._id}`} className="mb-8 flex">
              <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                Zobacz szczegóły profilu
              </button>
            </Link>
            {/* <div className="flex gap-4"> */}
            {/* <Image */}
            {/*  src="/assets/icons/star.svg" */}
            {/*  width={30} */}
            {/*  height={30} */}
            {/*  alt="ikonka zainteresowania oferta pracy" */}
            {/*  className="object-contain" */}
            {/* /> */}
            {/* <Image */}
            {/*  src="/assets/icons/star-fill.svg" */}
            {/*  width={30} */}
            {/*  height={30} */}
            {/*  alt="ikonka braku zainteresowania oferta pracy" */}
            {/*  className="object-contain" */}
            {/* /> */}
            {/* </div> */}
          </div>
        </div>
      )}
      {user.role === "employer" && (
        <div className="card-wrapper mt-2 flex w-full flex-col rounded-[10px] px-11 py-2">
          <div className="flex-end mt-4 flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <p className="body-regular text-primary-500"> {user.city} </p>
              <p>
                <b>{user.hours}</b>
              </p>
            </div>
            <h3 className="h3-bold text-dark200_light900 mb-2 line-clamp-1">
              {user.companyName}
            </h3>
            <div className="flex gap-4">
              <Image
                src="/assets/icons/company.png"
                width={60}
                height={60}
                alt="ikonka biura firmy"
                className="object-contain"
              />
              <div className="flex flex-col">
                <div className="flex flex-col gap-0.5">
                  <p> Szukamy: </p>
                  <p className="font-bold">{user.occupation}</p>
                  <p className="font-bold">{user.specialization}</p>
                </div>
              </div>
            </div>
            <Link href={`/jobs/${user._id}`} className="m-2 flex">
              <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                Zobacz szczegóły profilu
              </button>
            </Link>
            {/* <div className="flex gap-4"> */}
            {/* <Image */}
            {/*  src="/assets/icons/star.svg" */}
            {/*  width={30} */}
            {/*  height={30} */}
            {/*  alt="ikonka zainteresowania oferta pracy" */}
            {/*  className="object-contain" */}
            {/* /> */}
            {/* <Image */}
            {/*  src="/assets/icons/star-fill.svg" */}
            {/*  width={30} */}
            {/*  height={30} */}
            {/*  alt="ikonka braku zainteresowania oferta pracy" */}
            {/*  className="object-contain" */}
            {/* /> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
