"use client"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { sidebarLinks, sidebarLinksEmployeeAdmin, sidebarLinksEmployer } from "@/constants"
import { SheetClose } from "@/components/ui/sheet"
import { handleSignOut } from "@/lib/handleSignOut"

const NavContent = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user as { role?: string })?.role;

  const links = !session ? sidebarLinks : role === "employer" ? sidebarLinksEmployer : sidebarLinksEmployeeAdmin

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {links.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route
        return (
          <SheetClose asChild key={item.route}>
            <Link href={item.route} className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}>
              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? "" : "invert-colors"}`} />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>{item.label}</p>
            </Link>
          </SheetClose>
        )
      })}
      {session ? (
        (<button
          className="small-medium btn-secondary mt-[50px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
          onClick={handleSignOut}>
          <span className="primary-text-gradient">Wyloguj się</span>
        </button>)
      ) : (
        <div className="mt-[50px] flex flex-col gap-3">
          <SheetClose asChild>
            <Link href={"/sign-in"}>
              <button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient">Zaloguj się</span>
              </button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/sign-up"}>
              <button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span>Zarejestruj się</span>
              </button>
            </Link>
          </SheetClose>
        </div>
      )}
    </section>
  )
}

export default NavContent
