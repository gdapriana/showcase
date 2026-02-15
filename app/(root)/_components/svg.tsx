'use client';

import {useTheme} from "next-themes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import {useEffect, useRef} from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SVG() {
  const { theme } = useTheme();
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      stroke: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      fill: "none",
      strokeWidth: 40,
      borderRadius: "999em",
      strokeLinecap: "round",
      strokeDasharray: length ,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      stroke: 10,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [theme]);

  return (
    <div className="absolute left-0 top-0 w-full h-full z-10">
      <svg style={{transform: "translateY(350px)"}} className="w-full h-full hidden md:block" width="6420" height="32528" viewBox="0 0 6420 32528" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef} d="M0.228516 8.99414C0.228516 8.99414 4838.53 148.99 4790.23 2206.49C4743.97 4176.84 179.574 2535.56 296.229 4502.99C414.617 6499.68 4518.51 4213.04 5160.23 6107.49C5912 8326.85 1114.98 12176.1 518.729 9909.99C351.883 9275.89 291.611 8846.09 518.729 8230.99C1174.33 6455.44 4527.67 8161.15 5037.23 9983.99C5630.69 12107 181.878 11188.5 518.729 13367C813.362 15272.4 5108.73 13988.3 4765.23 15885.5C4449.99 17626.6 1261.1 15859.3 518.729 17465.5C-521.379 19715.8 6123.46 18566.1 5777.73 21021C5473 23184.7 394.58 21664 913.729 23786.5C1407.15 25803.8 5017.4 22983.1 6148.23 24725C7587.43 26941.9 2643.48 27642.3 2246.73 30255.5C2113.57 31132.5 2246.73 32527 2246.73 32527"/>
      </svg>
    </div>
  )
}