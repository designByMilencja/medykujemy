import Theme from "./Theme"
import MobileNav from "@/components/shared/navbar/MobileNav"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import Logo from "@/components/shared/navbar/Logo"

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 flex w-[100vw] justify-center">
      <div className="background-light900_dark200 flex-between fixed z-50 w-full max-w-screen-2xl gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
        <Logo />
        <GlobalSearch />
        <div className="flex-between gap-5">
          <Theme />
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
