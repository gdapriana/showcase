"use client";

import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import SocialCard from "@/app/(root)/_components/media-socials.tsx/social-card";
import CustomCursor from "@/app/(root)/_components/media-socials.tsx/custom-cursor";
gsap.registerPlugin(ScrollTrigger);

export default function MediaSocials({ socials }: { socials?: NotionPage[] }) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const split = new SplitType(textRef.current, { types: "chars" });
    gsap.fromTo(
      split.chars,
      {
        color: "#353535",
      },
      {
        color: "#ffffff",
        duration: 0.4,
        stagger: 0.02,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      },
    );
    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      {
        borderRadius: 4,
      },
      {
        borderRadius: 40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div className="relative">
      <CustomCursor isActive={cursorActive} />
      <main className="w-full px-4 relative flex flex-col justify-center items-center">
        <div ref={containerRef} className="max-w-[800px] bg-primary rounded-2xl md:p-16 p-10 relative w-full flex flex-col gap-2 justify-center items-center">
          <h2 ref={textRef} className="text-3xl md:text-3xl font-bold tracking-[-2px] text-background">
            Great collaborations begin with a message. Feel free to reach out through the channels below — I’m always open to new conversations.
          </h2>

          <div onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)} className="grid w-full mt-8 relative grid-cols-2 md:grid-cols-3">
            <div className="absolute z-20 left-0 top-0 w-[0.5px] h-full bg-primary"></div>
            <div className="absolute z-20 right-0 top-0 w-[0.5px] h-full bg-primary"></div>
            <div className="absolute z-20 left-0 top-0 h-[0.5px] w-full bg-primary"></div>
            <div className="absolute z-20 left-0 bottom-0 h-[0.5px] w-full bg-primary"></div>
            {socials && socials.map((social: NotionPage) => <SocialCard key={social.id} social={social} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
