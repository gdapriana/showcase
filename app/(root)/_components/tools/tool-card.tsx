"use client";
import { iconMap } from "@/utils/render-icon";
import { NotionPage, ToolPageProperties } from "@/utils/types/notionDatabaseQuery.type";
import { useState } from "react";

export default function ToolCard({ tool }: { tool?: NotionPage }) {
  const Icon = iconMap[(tool && tool.properties && "icon" in tool.properties && tool.properties.icon.rich_text[0].plain_text) || "FaHtml5"];
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="flex p-8 flex-col justify-start border items-start gap-6">
      <Icon size={60} className="w-16 h-16" />
      <h3 className="text-xl font-bold capitalize">{tool && tool.properties && "name" in tool.properties && tool.properties.name.title[0].plain_text}</h3>
      <p className="text-sm hidden md:block text-muted-foreground">{tool && tool.properties && "description" in tool.properties && tool.properties.description.rich_text[0].plain_text}</p>
    </div>
  );
}
