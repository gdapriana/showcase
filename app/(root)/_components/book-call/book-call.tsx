"use client";

import CustomCursor from "@/app/(root)/_components/book-call/custom-cursor";
import TextParalax from "@/app/(root)/_components/book-call/text-paralax";
import { Button } from "@/components/ui/button";
import { ease } from "@/utils/helpers";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { NotionPageResponse } from "@/utils/types/notionPage.type";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function BookCall({ user, skills }: { user?: NotionPageResponse; skills?: NotionPage[] }) {
  const ref = useRef(null);

  const [cursorActive, setCursorActive] = useState(false);

  const isInView = useInView(ref, {
    margin: "0px 100px -300px 0px",
  });

  return (
    <div className="relative">
      <CustomCursor isActive={cursorActive} />
      <motion.main animate={isInView ? { opacity: 1 } : { opacity: 0 }} className="w-full bg-background px-4 relative flex justify-center items-center">
        <motion.div
          ref={ref}
          whileInView={{ opacity: [0, 1], y: [0, 1] }}
          transition={{ duration: 2, ease: ease }}
          className="max-w-[800px] opacity-0 py-24 relative w-full flex flex-col gap-2 justify-center items-center"
        >
          <h2 className="text-3xl text-center capitalize md:leading-14 md:text-5xl font-bold md:tracking-[-3px] tracking-[-1px]">
            With {user?.properties.experience.number} Years of Experience Building Meaningful Digital Solutions
          </h2>
          <p className="text-md text-muted-foreground text-center">{user?.properties.description.rich_text[0].plain_text}</p>

          <TextParalax cursorActive={{ value: cursorActive, setValue: setCursorActive }} skills={skills} />

          <motion.div animate={isInView ? { y: 0 } : { y: 200 }} transition={{ ease: ease, duration: 1 }} className="flex justify-center gap-2 mt-4 items-center">
            <Button>Book a Call</Button>
            <Button variant="outline">Testimonials</Button>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}
