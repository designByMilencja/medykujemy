import React from "react"
import Theme from "@/components/shared/navbar/Theme"
import Logo from "@/components/shared/navbar/Logo"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
        <Logo />
        <div className="flex-between gap-5">
          <Theme />
        </div>
      </nav>
      <div className="flex">
        <section className="flex h-screen flex-1 flex-col items-center justify-center px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div>{children}</div>
        </section>
      </div>
    </main>
  )
}

export default Layout
