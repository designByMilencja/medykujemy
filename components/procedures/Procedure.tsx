import React from "react"
import Link from "next/link"

interface Props {
    _id: string
    title: string
    desc: string
    sources: {
        _id: string
        name: string
    }[]
    src: string,
    createdAt: string
}
const Procedure = ({ _id, title, sources, src, createdAt, desc }: Props) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    const formattedDate = createdAt.toLocaleDateString('pl-PL', options);
    return (
        <div className="card-wrapper mt-4 flex w-full flex-col gap-5 rounded-[10px] p-2 sm:px-11 md:items-center">
            <div className="mt-8 flex flex-col gap-2">
                <p className="body-regular text-primary-500">{formattedDate}</p>
                <Link href={`/procedures/${_id}`}>
                    <h3 className="sm:h3-semibold base-semibold text-dark200_light900 max-w-[500px]">{title}</h3>
                </Link>
                <div className="h-[25vh] w-full max-w-[500px] rounded-lg bg-cover bg-center bg-no-repeat my-1" style={{ backgroundImage: `url('${src}')` }}></div>
                <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify ">{desc}</p>
                <Link href={`/procedures/${_id}`} className="mb-8 flex">
                    <button className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">Zobacz procedurę</button>
                </Link>
            </div>
        </div>
    )
}

export default Procedure
