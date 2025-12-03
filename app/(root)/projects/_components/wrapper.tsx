import ProjectCard from "@/app/(root)/_components/current-project/project-card";
import { NotionPage } from "@/utils/types/notionDatabaseQuery.type";

export default function Wrapper({ items }: { items?: NotionPage[] | null }) {
  return (
    <div className="w-full px-4 relative flex justify-center items-center">
      <div className="max-w-[800px] py-28 relative w-full flex flex-col gap-8 justify-center items-center">
        <div className="columns-2 md:columns-3 gap-x-2 gap-y-2 ">{items && items.map((project: NotionPage, index: number) => <ProjectCard index={index} project={project} key={project.id} />)}</div>
      </div>
    </div>
  );
}
