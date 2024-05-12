import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {ParamsProps} from "@/types";
import {getProcedureById} from "@/lib/actions/procedure.action";
import CreateEditProcedure from "@/components/procedures/CreateEditProcedure";


const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options);
    if (!session || session?.user?.role !== "admin") {
        redirect("/sign-in");
    }
    const procedure = await getProcedureById({procedureId: params.id});

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Edycja procedury</h1>

            </div>
            <div className="mt-9">
                <CreateEditProcedure
                    type="edit"
                    procedureDetails={JSON.stringify(procedure)}
                />
            </div>
        </>
    );
}

export default Page;
