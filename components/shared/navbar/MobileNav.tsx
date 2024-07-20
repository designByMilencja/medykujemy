import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import NavContent from "@/components/shared/navbar/NavContent";

const MobileNav = async () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/menu.svg"
          alt="Mobile menu icon"
          width={36}
          height={36}
          className="invert-colors cursor-pointer rounded bg-primary-500 p-1 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/logo-pp.png"
            alt="Logo Medykujemy.pl"
            width={53}
            height={53}
          />
          <h2 className="h2-bold font-poppins text-accent-blue">
            Medykujemy.pl
          </h2>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
