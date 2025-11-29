import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import { Dispatch, SetStateAction, useRef } from "react";
import { iconMap } from "@/utils/render-icon";
import CustomCursor from "@/app/(root)/_components/book-call/custom-cursor";

interface ParallaxProps {
  skills?: NotionPage[];
  baseVelocity: number;
}

function SkillCard({ title, icon }: { title?: string; icon?: string }) {
  const Icon = iconMap[icon || "FaHtml5"];
  return (
    <div className="flex justify-center items-center gap-4">
      {icon && <Icon size={40} />}
      <h3 className="text-lg capitalize font-semibold">{title}</h3>
    </div>
  );
}

function ParallaxText({ skills, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -1000, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller flex flex-nowrap whitespace-nowrap gap-16" style={{ x }}>
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
        {skills &&
          skills.map((skill: NotionPage) => (
            <SkillCard key={skill.id} title={skill.properties.name.title[0].text.content} icon={skill && "icon" in skill.properties ? skill.properties.icon.rich_text[0].text.content : undefined} />
          ))}
      </motion.div>
    </div>
  );
}

export default function TextParalax({ skills, cursorActive }: { skills?: NotionPage[]; cursorActive: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> } }) {
  return (
    <div
      onMouseEnter={() => cursorActive?.setValue(true)}
      onMouseLeave={() => cursorActive?.setValue(false)}
      className="w-full relative mask-[linear-gradient(to_right,transparent,black_40%,black_60%,transparent)] mask-no-repeat my-12 overflow-hidden"
    >
      <ParallaxText baseVelocity={3} skills={skills} />
    </div>
  );
}
