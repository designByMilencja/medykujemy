import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {ParamsProps} from "@/types";
import CompanyForm from "@/components/job/CompanyForm";
import {getUserById} from "@/lib/actions/user.action";
import CandidateForm from "@/components/job/CandidateForm";


const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options);
    if (!session || session?.user?.role !== "employee" && session?.user?.role !== "employer") {
        redirect("/sign-in");
    }
    const result = await getUserById({userId: params.id});
    if (!result) {
        console.error("Nie ma takiego użytkownika")
        redirect("/sign-in");
    }
    const heading = session?.user?.role === "employer" ? "Edycja profilu firmy" : "Edycja profilu pracownika";
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">{heading}</h1>
            </div>
            <div className="mt-9">
                 {session?.user?.role === "employer" && (
                     <CompanyForm type="edit" userDetails={JSON.stringify(result)}/>)}
                {session?.user?.role === "employee" && (
                    <CandidateForm type="edit" userDetails={JSON.stringify(result)}/>)}
            </div>
        </>
    );
}

export default Page;
