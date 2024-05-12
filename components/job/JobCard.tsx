import {getUserById} from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

interface Props {
    id: string;
}

const JobCard = async ({id}: Props) => {
    const userId = id;
    const user = await getUserById({userId})
    console.log(user)
    const src = "link do strony firmy"
    const image = '/assets/images/team.jpg'
    return (
        <div>
            {user?.role === "employee" && <>
                <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                    <h1 className="h1-bold text-dark100_light900">{user.name ? user.name : 'użytkownik Medykuj'} {user.surname ? user.surname : ''}</h1>
                </div>
            </>}
            {user?.role === "employer" && <>
                <div className="flex w-full flex-col justify-between gap-4">
                    <div className="h-[200px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                         style={{backgroundImage: `url('${image}')`}}></div>
                    <div className="flex w-full justify-between items-center">
                        <h1 className="h1-bold text-dark100_light900">{user.companyName}</h1>
                        <Link href={src} className="flex">
                            <button
                                className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">Przejdź
                                do strony firmy
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <div className="bg-primary-500 rounded-full p-1">
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
                            <div className="bg-primary-500 rounded-full p-1">
                                <Image
                                    src="/assets/icons/people-outline.svg"
                                    width={20}
                                    height={40}
                                    alt="ikonka biura firmy"
                                />
                            </div>
                            <p>Zawód:</p>
                            <p className="font-bold">{user.occupation}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-primary-500 rounded-full p-1">
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
                            <div className="bg-primary-500 rounded-full p-1">
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
                            <div className="bg-primary-500 rounded-full p-1">
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
                    <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">Zakres obowiązków:</h2>
                    <div>{ReactHtmlParser(user.responsibilities)}</div>
                </div>
                <div className="my-5">
                    <h2 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">Wymagania:</h2>
                    <div>{ReactHtmlParser(user.requirements)}</div>
                </div>
                <div className="my-5">
                    <p>{user.additional}</p>
                </div>
            </>}
        </div>
    );
}

export default JobCard;
