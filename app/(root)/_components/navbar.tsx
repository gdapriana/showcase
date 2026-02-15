import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavType } from "@/utils/types/customTypes";
import { FaMailBulk, FaMailchimp, FaWhatsapp } from "react-icons/fa";
import ThemeSwitcher from "@/app/(root)/_components/theme-switcher";
import { Mail } from "lucide-react";

const navs: NavType[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar({ logo, email }: { logo?: string | null; email?: string | null }) {
  return (
    <header className="fixed top-5 z-999 px-4 w-full flex justify-center items-center">
      <div className="flex relative justify-between p-2 items-center bg-background max-w-[800px] rounded-full w-full border-[0.5px]">
        <Link className="font-semibold z-20" href="/">
          <Image src={"/brand.png"} alt="logo" className="h-10 w-10" width={100} height={100} loading="lazy" />
        </Link>
        <div className="hidden z-10 absolute w-full left-0 md:flex justify-center items-center gap-8">
          {navs.map((nav: NavType, key: number) => (
            <a className="uppercase text-xs overflow-hidden font-semibold" key={key} href={nav.href}>
              <div className="relative">
                <span className="top-0 left-0">{nav.name}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="flex z-20 gap-1 justify-center items-center">
          <ThemeSwitcher />
          <Button asChild size="icon" className="cursor-pointer">
            <Link href={`mailto:${email}` || "gedeapriana36@gmail.com"}>
              <Mail />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
