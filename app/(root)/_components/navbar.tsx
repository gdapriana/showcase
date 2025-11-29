import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavType } from "@/utils/types/customTypes";

const navs: NavType[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experiences", href: "/experiences" },
];

export default function Navbar({ logo }: { logo?: string | null }) {
  return (
    <header className="fixed top-5 z-999 px-4 w-full flex justify-center items-center">
      <div className="flex relative justify-between p-2 items-center bg-background max-w-[800px] rounded-full w-full border">
        <Link className="font-semibold" href="/">
          <Image src={logo || ""} alt="logo" className="h-10 w-10" width={100} height={100} loading="lazy" />
        </Link>
        <div className="hidden absolute w-full left-0 md:flex justify-center items-center gap-8">
          {navs.map((nav: NavType, key: number) => (
            <a className="uppercase text-sm overflow-hidden font-semibold" key={key} href={nav.href}>
              <div className="relative">
                <span className="top-0 left-0">{nav.name}</span>
              </div>
            </a>
          ))}
        </div>
        <Button asChild>
          <Link href="">Connect</Link>
        </Button>
      </div>
    </header>
  );
}
