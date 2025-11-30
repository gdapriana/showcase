"use client";
import CustomCursor from "@/app/(root)/_components/current-project/custom-cursor";
import ProjectCard from "@/app/(root)/_components/current-project/project-card";
import { Button } from "@/components/ui/button";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";

export default function CurrentProject({ projects }: { projects?: NotionPage[] }) {
  const [cursorActive, setCursorActive] = useState(false);

  return (
    <div className="relative">
      <CustomCursor isActive={cursorActive} />

      <div className="w-full px-4 relative flex justify-center items-center">
        <div className="max-w-[800px] py-20 relative w-full flex flex-col gap-8 justify-center items-center">
          <header className="flex w-full md:flex-row flex-col gap-6 justify-between items-center">
            <div className="flex flex-col md:items-start gap-2 justify-center items-center">
              <h2 className="text-2xl font-bold capitalize text-center md:text-left">Current Projects</h2>
              <p className="max-w-[400px]  md:text-left text-sm text-muted-foreground text-center">Here are the ideas I’m bringing to life at the moment. More coming soon.</p>
            </div>
            <Button asChild size="sm" variant="secondary">
              <a className="" href="/projects">
                All Projects <CgArrowTopRight />
              </a>
            </Button>
          </header>

          <div onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)} className="columns-2 md:columns-3 gap-x-1 gap-y-1 ">
            {projects && projects.map((project: NotionPage, index: number) => <ProjectCard index={index} project={project} key={project.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
