import Link from "next/link";
import {getServerSession} from "next-auth";
import {options} from "@/app/(auth)/api/auth/[...nextauth]/options";
import {ParamsProps} from "@/types";
import {getArticleById} from "@/lib/actions/articles.action";
import SingleArticle from "@/components/articles/SingleArticle";


const Page = async ({params}: ParamsProps) => {
    const session = await getServerSession(options);
    const articleId = params.id
    const article = await getArticleById({articleId})

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                {session?.user?.role === "admin" ?
                    <Link href={`/articles/edit/${params.id}`} className="flex justify-end max-sm:w-full">
                        <button className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900">
                            Edytuj artykuł
                        </button>
                    </Link> : ""}
            </div>
                <SingleArticle key={articleId}  title={article.title} src={article.image} tags={article.tags} description={article.description} />
        </>
    );
}

export default Page;
