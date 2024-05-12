import Link from "next/link"
import Tag from "./Tag"
// import { getHotQuestions } from "@/lib/actions/question.action";
// import { getTopPopularTags } from "@/lib/actions/tag.action";

const titles = [
  { _id: "1", title: "Nowa terapia genowa obiecuje rewolucję w leczeniu chorób genetycznych." },
  { _id: "2", title: "Badania potwierdzają skuteczność nowego leku przeciwnowotworowego." },
  { _id: "3", title: "Mechanizm, który reguluje sen, może prowadzić do lepszych terapii bezsenności." },
  { _id: "4", title: "Rozwój technologii telemedycyny – Jak pandemia zmienia dostęp do opieki zdrowotnej." },
]
const subjects = [
  { _id: "1", title: "medycyna" },
  { _id: "2", title: "trychologia" },
  { _id: "3", title: "zdrowie" },
  { _id: "4", title: "witaminy" },
]

const RightSidebar = async () => {

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[300px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden xl:w-[400px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Ostatnio dodane</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {titles.map((title) => (
            <Link key={title._id} href={`/question/${title._id}`} className="flex cursor-pointer items-start justify-between gap-3">
              <p className="body-medium text-dark500_light700">{title.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popularne tematy</h3>
        <div className="mt-7 flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <Tag key={subject._id} _id={subject._id} name={subject.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar
