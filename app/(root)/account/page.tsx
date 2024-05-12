import {getServerSession} from "next-auth"
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options"
import {redirect} from "next/navigation"
import Link from "next/link"

const Account = async () => {
    const session = await getServerSession(options)
    if (!session) {
        redirect("/sign-in")
    }

    // await deleteUser(id)
    // redirect('/register')
    // const role = (session?.user as { role?: string })?.role
    // const id = (session?.user as {id?: string })?.id
    return (
        <div>
            {session?.user?.role === "admin" && (
                <div>
                    <h1 className="h1-bold text-dark100_light900 text-center mb-8">Konto administratora</h1>
                    <div
                        className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                        <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Dodaj
                            nowy artykuł</p>
                        <Link href="/articles/add" className="flex justify-end max-sm:w-full">
                            <button
                                className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Dodaj
                            </button>
                        </Link>
                    </div>
                    <div
                        className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                        <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Dodaj
                            nową procedurę</p>
                        <Link href="/procedures/add" className="flex justify-end max-sm:w-full">
                            <button
                                className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Dodaj
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            {session?.user?.role === "employer" && (
                <>
                    <h1 className="h1-bold text-dark100_light900">Konto pracodawcy</h1>
                    <div>
                        {/*<p>{session?.user?.email}</p>*/}
                        <div  className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Dodaj profil firmy do portalu ogłoszeń</p>
                            <Link href={`/jobs/add/${session?.user?.id}`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Dodaj
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Usuń
                                profil firmy z portalu ogloszeń</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Usuń
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Zmień
                                swoje hasło</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Zmień
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Usuń
                                konto z aplikacji</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Usuń
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
            {session?.user?.role === "employee" && (
                <>
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1 className="h1-bold text-dark100_light900">Konto pracownika</h1>
                            {/*<p className="text-dark500_light700 my-2 max-w-[500px]">{session?.user?.email}</p>*/}
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Dodaj
                                swój profil do portalu ogłoszeń</p>
                            <Link href={`/jobs/add/${session?.user?.id}`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Dodaj
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Usuń
                                swój profil z portalu ogloszeń</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Usuń
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Zmień
                                swoje hasło</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Zmień
                                </button>
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center card-wrapper mt-3 rounded-[10px] p-2 sm:px-11">
                            <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">Usuń
                                konto z aplikacji</p>
                            <Link href={`/`} className="flex justify-end max-sm:w-full">
                                <button
                                    className="primary-gradient m-2 min-h-[46px] min-w-[150px] rounded-lg px-4 py-3 text-light-900">Usuń
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Account
