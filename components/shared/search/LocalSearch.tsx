'use client'
import React from "react"
import Image from "next/image"

interface Props {
  route: string
  iconPosition: "left" | "right"
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearch = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: Props) => {
  return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-2 rounded-[10px] px-4 ${otherClasses}`}>
      {iconPosition === "left" &&
       <Image src={imgSrc} alt="search icon" width={20} height={20} className="cursor-pointer" />}
      <input type="text" placeholder={placeholder} value="" onChange={() => {}}
      className="paragraph-regular no-focus placeholder text-dark400_light700 bg-transparent border-none w-full shadow-none outline-none" />
      {iconPosition === "right" &&
       <Image src={imgSrc} alt="search icon" width={20} height={20} className="cursor-pointer" />}
    </div>
  )
}

export default LocalSearch
