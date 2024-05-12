"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

const Theme = () => {
  const { mode, setMode } = useTheme();
  const handleThemeChange = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
      <button
        className="cursor-pointer"
        onClick={handleThemeChange}
      >{mode === "light" ?
        <Image src="/assets/icons/dark.svg" alt="moon" width={28} height={28} className="active-theme" /> :
        <Image src="/assets/icons/light.svg" alt="sun" width={28} height={28} className="active-theme" /> }
      </button>
  );
};

export default Theme;
