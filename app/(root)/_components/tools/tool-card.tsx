"use client";
import { cn } from "@/lib/utils";
import { ease } from "@/utils/helpers";
import { iconMap } from "@/utils/render-icon";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ToolCard({ tool, index }: { tool?: NotionPage; index: number }) {
  const Icon = iconMap[(tool && tool.properties && "icon" in tool.properties && tool.properties.icon.rich_text[0].plain_text) || "FaHtml5"];
  const [hover, setHover] = useState<boolean>(false);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "0px 100px -100px 0px",
  });

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: ["40px", 0] } : { opacity: 0 }}
      transition={{ duration: 1, ease: "anticipate", delay: index * 0.1 }}
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex p-8 overflow-hidden flex-col relative justify-start border border-muted-foreground/10 items-start gap-6"
    >
      <Icon size={60} className={cn("w-16 transition duration-500 h-16 z-20", hover ? "text-background" : "text-primary")} />
      <h3 className={cn("text-xl font-bold z-20 capitalize", hover ? "text-background" : "text-primary")}>
        {tool && tool.properties && "name" in tool.properties && tool.properties.name.title[0].plain_text}
      </h3>
      <p className="text-sm hidden md:block z-20 text-muted-foreground">{tool && tool.properties && "description" in tool.properties && tool.properties.description.rich_text[0].plain_text}</p>
      <motion.div transition={{ ease: ease, duration: 1.5 }} animate={hover ? { top: ["-100%", 0] } : { top: [0, "100%"] }} className="absolute w-full h-full bg-primary left-0 -top-full"></motion.div>
    </motion.div>
  );
}
