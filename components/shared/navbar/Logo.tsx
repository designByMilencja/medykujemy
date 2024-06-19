import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src="/assets/icons/logo.svg" alt="Logo" width={53} height={53} />
      <p className="h2-bold font-poppins text-accent-blue  dark:text-light-900 max-sm:hidden">
        Medykujemy.pl
      </p>
    </Link>
  );
};

export default Logo;
