import { NavType } from "@/utils/types/customTypes";
import { Easing } from "motion-utils";

export const ease: Easing = [0, 0.92, 0.29, 1.08];

export const navList: NavType[] = [
  { name: "Proejcts", href: "/projects" },
  { name: "Products", href: "/products" },
  { name: "Certificates", href: "/certificates" },
  { name: "Experiences", href: "/experiences" },
];
