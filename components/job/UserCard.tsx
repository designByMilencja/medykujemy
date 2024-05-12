import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
    user: {
        _id: string;
        name?: string;
        surname?: string;
        companyName?: string;
        email: string;
        city: string;
        occupation?: string;
        specialization?: string;
        hours?: string;
        contractType?: string;
        additional?: string;
        position?: string;
        positionDesc?: string;
        requirements?: string;
        role: string;
    };
}

const UserCard = async ({user}: Props) => {
    return (<>
            {user.role === "employee" &&
                <div className="card-wrapper mt-2 flex w-full flex-col rounded-[10px] py-2 px-11">
                    <div className="flex-end mt-4 flex flex-col gap-5">
                        <div className="flex w-full justify-between">
                            <p className="body-regular text-primary-500"> {user.city} </p>
                            <div className="flex gap-1">
                                <Image
                                    src="/assets/icons/time.svg"
                                    width={20}
                                    height={20}
                                    alt="ikonka zegara"
                                    className="object-cover"
                                />
                                <p><b>{user.hours}</b></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Image
                                src="/assets/icons/nurse.png"
                                width={60}
                                height={40}
                                alt="ikonka pielęgniarki"
                                className="object-cover"
                            />
                            <div className="flex flex-col">
                                <h3 className="h3-bold text-dark200_light900 line-clamp-1 mb-2">
                                    {user.name ? user.name : 'użytkownik Medykuj'} {user.surname ? user.surname : ''}
                                </h3>
                                <div className="flex gap-2">
                                    <p> Zawód: </p>
                                    <p className="font-bold">{user.occupation}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p> Specjalizacja: </p>
                                    <p className="font-bold">{user.specialization}</p>
                                </div>
                            </div>
                        </div>
                        <Link href={`/jobs/${user._id}`} className="mb-8 flex">
                            <button
                                className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">Zobacz
                                szczegóły profilu
                            </button>
                        </Link>
                    </div>
                </div>
            }
            {user.role === "employer" &&
                <div className="card-wrapper mt-2 flex w-full flex-col rounded-[10px] py-2 px-11">
                    <div className="flex-end mt-4 flex flex-col gap-5">
                        <div className="flex w-full justify-between">
                            <p className="body-regular text-primary-500"> {user.city} </p>
                            <div className="flex gap-1">
                                <Image
                                    src="/assets/icons/time.svg"
                                    width={20}
                                    height={20}
                                    alt="ikonka zegara"
                                    className="object-cover"
                                />
                                <p><b>{user.hours}</b></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Image
                                src="/assets/icons/company.png"
                                width={60}
                                height={40}
                                alt="ikonka biura firmy"
                            />
                            <div className="flex flex-col">
                                <h3 className="h3-bold text-dark200_light900 line-clamp-1 mb-2">
                                    {user.companyName}
                                </h3>
                                <div className="flex gap-2">
                                    <p> Szukany pracownik: </p>
                                    <p className="font-bold">{user.occupation}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p> Specjalizacja: </p>
                                    <p className="font-bold">{user.specialization}</p>
                                </div>
                            </div>
                        </div>
                        <Link href={`/jobs/${user._id}`} className="mb-8 flex">
                            <button
                                className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">Zobacz
                                szczegóły profilu
                            </button>
                        </Link>
                    </div>
                </div>}
        </>
    );

}

export default UserCard;
