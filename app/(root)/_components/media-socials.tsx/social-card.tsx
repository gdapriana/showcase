"use client";
import { iconMap } from "@/utils/render-icon";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";

export default function SocialCard({ social }: { social?: NotionPage }) {
  const Icon = iconMap[(social && social.properties && "icon" in social.properties && social.properties.icon.rich_text[0].plain_text) || "FaFacebook"];
  return (
    <a
      target="_blank"
      href={(social && social.properties && "url" in social.properties && social.properties.url.url) || "#"}
      className="flex p-8 border-muted-foreground/10 border-[0.5px] group justify-center items-center"
    >
      <Icon size={20} className="text-muted-foreground transition duration-500 w-8 h-8 group-hover:text-background" />
    </a>
  );
}
