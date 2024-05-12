import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {getArticleById} from "@/lib/actions/articles.action";
import CreateEditArticle from "@/components/articles/CreateEditArticle";
import {ParamsProps} from "@/types";


const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options);
    if (!session || session?.user?.role !== "admin") {
        redirect("/sign-in");
    }
    const result = await getArticleById({articleId: params.id});

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Edycja artykułu</h1>

            </div>
            <div className="mt-9">
                <CreateEditArticle
                    type="edit"
                    articleDetails={JSON.stringify(result)}
                />
            </div>
        </>
    );
}

export default Page;
