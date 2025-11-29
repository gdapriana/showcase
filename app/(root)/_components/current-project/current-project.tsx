"use client";
import CustomCursor from "@/app/(root)/_components/current-project/custom-cursor";
import ProjectCard from "@/app/(root)/_components/current-project/project-card";
import { Button } from "@/components/ui/button";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { useState } from "react";

export default function CurrentProject({ projects }: { projects?: NotionPage[] }) {
  const [cursorActive, setCursorActive] = useState(false);

  return (
    <div className="relative">
      <CustomCursor isActive={cursorActive} />

      <div className="w-full px-4 relative flex justify-center items-center">
        <div className="max-w-[800px] py-20 relative w-full flex flex-col gap-8 justify-center items-center">
          <header className="flex w-full md:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold capitalize">Current Projects</h2>
            <Button asChild size="sm" variant="secondary">
              <a className="" href="/projects">
                All Projects
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
