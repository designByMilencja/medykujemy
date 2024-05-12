"use client";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search-outline.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <input
          type="text"
          //   value=""
          //   onChange={(e) => {
          //     setSearch(e.target.value);
          //     if (!isOpen) setIsOpen(true);
          //     if (e.target.value === "" && isOpen) setIsOpen(false);
          //   }}
          placeholder="Szukaj"
          className="paragraph-regular text-dark400_light700 no-focus placeholder border-none bg-transparent shadow-none outline-none"
        />
      </div>
      {/* {isOpen && <GlobalResult />} */}
    </div>
  );
};

export default GlobalSearch;
