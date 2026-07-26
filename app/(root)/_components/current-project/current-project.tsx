"use client";
import CustomCursor from "@/app/(root)/_components/current-project/custom-cursor";
import ProjectCard from "@/app/(root)/_components/current-project/project-card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/utils/requests/tanstackquery/project.query";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";

const queryClient = new QueryClient();

export default function CurrentProject({ projects }: { projects?: NotionPage[] }) {
  const [cursorActive, setCursorActive] = useState(false);

  const { data, isLoading } = useProjects();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <CustomCursor isActive={cursorActive} />

        <div className="w-full px-4 relative flex justify-center items-center">
          <div className="max-w-[1200px] py-20 relative w-full flex flex-col gap-8 justify-center items-center">
            <header className="flex w-full md:flex-row flex-col gap-6 justify-between items-center">
              <div className="flex flex-col md:items-start gap-2 justify-center items-center">
                <h2 className="text-2xl font-bold capitalize text-center md:text-left">Current Projects</h2>
                <p className="max-w-[400px]  md:text-left text-sm text-muted-foreground text-center">Here are the ideas I’m bringing to life at the moment. More coming soon.</p>
              </div>
              <Button asChild size="lg" className="rounded-full">
                <a className="" href="/projects">
                  All Projects <CgArrowTopRight />
                </a>
              </Button>
            </header>

            {isLoading && <div className="flex justify-center items-center h-40">Loading...</div>}

            {!isLoading && data && data.results && (
              <div onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)} className="grid grid-cols-2 gap-4">
                {data.results && data.results.map((project: NotionPage, index: number) => <ProjectCard index={index} project={project} key={project.id} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
