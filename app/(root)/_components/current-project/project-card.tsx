"use client";
import { MultiSelectOption, NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import { ease } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project, index }: { project?: NotionPage; index: number }) {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "0px 100px -100px 0px",
  });

  return (
    <motion.div
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "anticipate", delay: index * 0.1 }}
      ref={ref}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className="break-inside-avoid mb-2 flex overflow-hidden relative"
    >
      {project && "deploy_url" in project.properties && project.properties.deploy_url.files[0]?.external?.url && (
        <motion.a
          animate={mouseEnter ? { y: 0, rotate: "-45deg" } : { y: "-80px", rotate: "-90deg" }}
          transition={{ duration: 1, ease: ease }}
          target="_blank"
          className="absolute bg-primary mix-blend-difference w-10 h-10 flex justify-center items-center rounded-full z-20 top-4 right-4"
          href={project.properties.deploy_url.files[0].external.url}
        >
          <MdArrowForward className="text-background" size={20} />
        </motion.a>
      )}

      <motion.div animate={mouseEnter ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2, ease: ease }} className="absolute bottom-0 left-0 w-full z-20 flex justify-center items-center p-3">
        <div className="w-full bg-background flex flex-col justify-start items-start gap-3 p-3">
          <h3 className="text-sm font-bold tracking-[-1px] capitalize">{project && "name" in project.properties && project.properties.name.title[0].plain_text}</h3>
          <p className="text-xs font-semibold text-muted-foreground tracking-[-0.5px]">{project && "description" in project.properties && project.properties.description.rich_text[0]?.plain_text}</p>
          {project && "tech" in project.properties && project.properties.tech.multi_select && (
            <div className="flex justify-center items-center gap-1">
              {project.properties.tech.multi_select.map((tech: MultiSelectOption, index: number) => (
                <Badge variant="outline" key={index}>
                  {tech.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      {isImageError ? (
        <Image
          width={400}
          height={600}
          onError={() => setIsImageError(true)}
          loading="lazy"
          className="h-auto z-10 grayscale max-w-full"
          src={"https://images.unsplash.com/photo-1762446093300-44cdc84337eb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Gallery image"
        />
      ) : (
        <Image
          width={400}
          height={600}
          onError={() => setIsImageError(true)}
          loading="lazy"
          className={cn("h-auto transition duration-500 z-10 max-w-full", mouseEnter ? "grayscale-0" : "grayscale")}
          src={project && "cover" in project.properties ? project.properties?.cover.files[0].file?.url || "" : ""}
          alt="Gallery image"
        />
      )}
    </motion.div>
  );
}
