import {getServerSession} from "next-auth"
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options"
import {redirect,} from "next/navigation"
import CompanyForm from "@/components/job/CompanyForm"
import CandidateForm from "@/components/job/CandidateForm"
import {getUserById} from "@/lib/actions/user.action";
import {ParamsProps} from "@/types";

const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options)
    if (!session) {
        redirect("/sign-in")
    }
    const userId = params.id
    console.log(userId)
    const user = await getUserById({userId});

    // await deleteUser(id)
    // redirect('/register')
    // const role = (session?.user as { role?: string })?.role
    // const id = (session?.user as {id?: string })?.id
    return (
        <div>
            {session?.user?.role === "employer" && (
                <div>
                    <h1 className="h1-bold text-dark100_light900">Dodaj swój profil do listy ogłoszeń z pracownikami
                        uzupełniając wymagane dane:</h1>
                    <div className="mt-9">
                        <CompanyForm type="add" userDetails={JSON.stringify(user)}/>
                    </div>
                </div>
            )}
            {session?.user?.role === "employee" && (
                <div>
                    <h1 className="h1-bold text-dark100_light900">Dodaj swój profil do listy ogłoszeń z pracownikami
                        uzupełniając wymagane dane:</h1>
                    <div className="mt-9">
                        <CandidateForm type="add" userDetails={JSON.stringify(user)}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
