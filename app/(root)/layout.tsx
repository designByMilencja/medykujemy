import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Footer from "@/components/shared/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative mx-auto max-w-[2000px]">
      <Navbar />
      <div className="flex h-screen overflow-hidden">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col overflow-y-auto px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
