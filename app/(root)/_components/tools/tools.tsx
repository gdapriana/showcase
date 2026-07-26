"use client";
import CustomCursor from "@/app/(root)/_components/tools/custom-cursor";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/utils/helpers";
import ToolCard from "@/app/(root)/_components/tools/tool-card";

export default function Tools({ tools }: { tools?: NotionPage[] }) {
  const ref = useRef(null);

  const [cursorActive, setCursorActive] = useState(false);

  const isInView = useInView(ref, {
    margin: "0px 100px -300px 0px",
  });
  return (
    <div className="relative">
      <CustomCursor isActive={cursorActive} />
      <motion.main animate={isInView ? { opacity: 1 } : { opacity: 0 }} className="w-full px-4 relative flex flex-col justify-center items-center">
        <motion.div
          ref={ref}
          whileInView={{ opacity: [0, 1], y: [0, 1] }}
          transition={{ duration: 2, ease: ease }}
          className="max-w-[1200px] opacity-0 py-24 relative w-full flex flex-col gap-2 justify-center items-center"
        >
          <h2 className="text-3xl text-center capitalize md:leading-14 md:text-5xl font-bold md:tracking-[-3px] tracking-[-1px]">The Tools Behind the Craft</h2>
          <p className="text-md text-muted-foreground text-center">Design, planning, and coding tools I work with.</p>
          <div onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)} className="grid cursor-none grid-cols-2 md:grid-cols-3 gap-2 w-full mt-12">
            {tools && tools.map((tool: NotionPage, index: number) => <ToolCard index={index} tool={tool} key={tool.id} />)}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
