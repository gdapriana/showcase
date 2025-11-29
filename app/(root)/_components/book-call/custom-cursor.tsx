"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor({ isActive }: { isActive: boolean }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY,
      }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="pointer-events-none text-sm uppercase font-bold py-2 px-6 fixed top-0 left-0 z-999 rounded-full border bg-background mix-blend-difference"
    >
      Skills
    </motion.div>
  );
}
