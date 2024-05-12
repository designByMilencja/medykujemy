"use client"
import { sidebarLinks, sidebarLinksEmployeeAdmin, sidebarLinksEmployer } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { handleSignOut } from "@/lib/handleSignOut"


const LeftSidebar = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  // const userId = session?.user?._id
  const role = (session?.user as { role?: string })?.role
  const links = !session ? sidebarLinks : role === "employer" ? sidebarLinksEmployer : sidebarLinksEmployeeAdmin


  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[300px] xl:w-[400px]">
      <div className="flex flex-1 flex-col gap-6">
        {links.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

          // if (item.route === "/account") {
          //   if (userId) {
          //     item.route = `${item.route}/${userId}`
          //   } else {
          //     return null
          //   }
          // }
          return (
            <Link key={item.route} href={item.route} className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}>
              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? "" : "invert-colors"}`} />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
        {session ? (
          <button className="small-medium btn-secondary mt-[50px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none" onClick={handleSignOut}>
            <Image src="/assets/icons/log-out.svg" alt="log-out icon" width={20} height={20} className="invert-colors lg:hidden" />
            <span className="primary-text-gradient max-lg:hidden">Wyloguj się</span>
          </button>
        ) : (
          <div className="mt-[50px] flex flex-col gap-3">
            <Link href={"/sign-in"}>
              <button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient max-lg:hidden">Zaloguj się</span>
                <Image src="/assets/icons/sign-in.svg" alt="login icon" width={20} height={20} className="invert-colors lg:hidden" />
              </button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image src="/assets/icons/sign-up.svg" alt="sign-up icon" width={20} height={20} className="invert-colors lg:hidden" />
                <span className="max-lg:hidden">Zarejestruj się</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default LeftSidebar
