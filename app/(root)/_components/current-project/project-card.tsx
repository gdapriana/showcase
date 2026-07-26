"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CgArrowTopRight } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

export default function ProjectCard({ project, index }: { project?: any; index: number }) {
  return (
    <article className="flex border overflow-hidden rounded-4xl justify-start items-stretch flex-col">
      <div className="aspect-video">
        {project?.properties.cover.files[0].file.url ? (
          <Image src={project?.properties.cover.files[0].file.url ?? ""} alt="cover" width={1000} height={1000} className="w-full aspect-16/11 h-full object-cover" />
        ) : (
          <div className="flex justify-center items-center bg-muted-foreground w-full h-full"></div>
        )}
      </div>
      <div className="flex bg-background flex-1 flex-col p-4 justify-start items-start gap-2">
        <h3 className="font-bold">{project.properties.name.title[0].plain_text}</h3>
        <p className="line-clamp-2 text-muted-foreground text-sm">{project.properties.description.rich_text[0].plain_text}</p>
        <div className="flex gap-1 w-full mt-auto justify-end items-center">
          {project.properties.github_repository.url && (
            <Button asChild size="icon" className="rounded-full">
              <Link href={project.properties.github_repository.url}>
                <SiGithub />
              </Link>
            </Button>
          )}
          {project.properties.deploy_url.files[0].name && (
            <Button asChild size="lg" className="rounded-full">
              <Link href={project.properties.deploy_url.files[0].name}>
                Visit <CgArrowTopRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
