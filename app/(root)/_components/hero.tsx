"use client";

import { NotionPageResponse } from "@/utils/types/notionPage.type";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease } from "@/utils/helpers";
import Image from "next/image";
import { useState } from "react";

export default function Hero({ user }: { user?: NotionPageResponse | null }) {
  const { scrollYProgress } = useScroll();
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const dynamicWidth = useTransform(scrollYProgress, [0, 1], ["15rem", "40rem"]);

  return (
    <main className="w-full bg-background h-dvh px-4 relative flex justify-center items-center">
      <div className="max-w-[800px] relative w-full flex justify-center items-center">
        <motion.div style={{ width: dynamicWidth }} className="aspect-9/16 bg-primary">
          {isImageError ? (
            <Image src={"/profile-image.jpg"} alt="profile" width={400} height={400} loading="lazy" unoptimized className="w-full grayscale h-full object-cover" />
          ) : (
            <Image
              onError={() => setIsImageError(true)}
              src={user?.properties.profile_img.files[0].file?.url || "/profile-image.jpg"}
              alt="profile"
              loading="lazy"
              width={400}
              height={400}
              unoptimized
              className="w-full grayscale h-full object-cover"
            />
          )}
          <div className="flex absolute left-0 gap-1 md:top-[20%] top-[5%] flex-col justify-start items-start">
            <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 1, ease: ease, delay: 2 }} className="text-background dark:text-primary mix-blend-difference">
              {user?.properties.username.title[0].text.content}
            </motion.span>
            <motion.h1
              animate={{ y: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 2, ease: ease, delay: 1 }}
              className="text-3xl md:tracking-[-4px] relative uppercase md:text-5xl overflow-hidden font-black mix-blend-difference text-background dark:text-primary"
            >
              {user?.properties.tags.multi_select[0].name}
            </motion.h1>
          </div>
          <div className="flex absolute right-0 gap-1 bottom-[5%] md:bottom-[20%] flex-col justify-start items-end">
            <motion.h1
              animate={{ y: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 2, ease: ease, delay: 1 }}
              className="text-3xl md:tracking-[-4px] text-end uppercase md:text-5xl font-black mix-blend-difference dark:text-primary text-background"
            >
              {user?.properties.tags.multi_select[3].name}
            </motion.h1>
            <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 1, ease: ease, delay: 2 }} className="text-background dark:text-primary mix-blend-difference">
              Based in {user?.properties.province.rich_text[0].text.content}, {user?.properties.country.rich_text[0].text.content}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
