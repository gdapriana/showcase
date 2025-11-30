"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MediaSocials() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <main className="w-full px-4 relative flex flex-col justify-center items-center">
        <div ref={containerRef} className="max-w-[800px] bg-primary rounded-2xl p-10 relative w-full flex flex-col gap-2 justify-center items-center">
          <h2 ref={textRef} className="text-3xl md:text-3xl font-bold tracking-[-2px] text-background">
            Great collaborations begin with a message. Feel free to reach out through the channels below — I’m always open to new conversations.
          </h2>
        </div>
      </main>
    </div>
  );
}
