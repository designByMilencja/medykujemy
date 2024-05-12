import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import {JobPageFilters} from "@/constants/filters";
import {getAllUsers, getUserById} from "@/lib/actions/user.action";
import UserCard from "@/components/job/UserCard";

const Job = async () => {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/sign-in");
    }
    const result = await getAllUsers({})
    const userId = session?.user?.id
    const user = await getUserById({userId})
    console.log(user.accept, 'mamy usera')
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Propozycje zatrudnienia</h1>
                {session?.user?.role === 'admin' || user.accept ? '' :
                    <Link href={`/jobs/add/${session?.user?.id}`} className="flex justify-end max-sm:w-full">
                        <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
                            Dodaj swój profil
                        </button>
                    </Link>}
                {session?.user?.role === 'admin' || !user.accept ? '' :
                    <Link href={`/jobs/edit/${session?.user?.id}`} className="flex justify-end max-sm:w-full">
                        <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
                            Edytuj swój profil
                        </button>
                    </Link>}
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch route="/jobs" iconPosition="left" imgSrc="/assets/icons/search-outline.svg"
                             placeholder="Szukaj pracownika/pracodawcy" otherClasses="flex-1"/>
                <Filter filters={JobPageFilters} otherClasses="min-h-[56px] sm:min-w-[170px]"/>
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result.users.length > 0 ? (
                    result.users.map((user) =>
                        <UserCard key={user._id} user={user}/>
                    )
                ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>Brak użytkowników</p>
                        <Link href={`/jobs/add/${session?.user?.id}`} className="mt-2 font-bold text-accent-blue">
                            Dołącz aby być pierwszy </Link>
                    </div>
                )}
            </section>
        </>
    );
};

export default Job;
