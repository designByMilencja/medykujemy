import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  text: string;
}
const Thanks = ({ text }: Props) => {
  return (
    <div className="flex-center mx-auto h-screen min-w-[320px] max-w-[550px] flex-col gap-5 text-center">
      <p>{text}</p>
      <Image
        src="/assets/icons/envelope.svg"
        alt="envelope image"
        width={50}
        height={50}
      />
      <Link href="/sign-in" className="px-2 hover:text-primary-500">
        Przejdź do logowania!
      </Link>
    </div>
  );
};

export default Thanks;
