import Link from "next/link";
import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {ParamsProps} from "@/types";
import SingleProcedure from "@/components/procedures/SingleProcedure";
import {getProcedureById} from "@/lib/actions/procedure.action";


const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options);
    const procedureId = params.id;
    const procedure = await getProcedureById({procedureId})

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                { session?.user?.role === "admin" ? <Link href={`/procedures/edit/${params.id}`} className="flex justify-end max-sm:w-full">
                    <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
                        Edytuj procedurę
                    </button>
                </Link> : "" }
            </div>
           <SingleProcedure key={procedureId} title={ procedure.title} description={procedure.description} sources={ procedure.sources} src={ procedure.image} video={ procedure.video}/>
        </>
    );
}

export default Page;
