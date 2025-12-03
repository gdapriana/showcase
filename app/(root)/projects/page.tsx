import Wrapper from "@/app/(root)/projects/_components/wrapper";
import { ProjectRequest } from "@/utils/requests/project.request";
import { NotionDatabaseQueryResponse } from "@/utils/types/notionDatabaseQuery.type";

export default async function Page() {
  const projects: NotionDatabaseQueryResponse | null = await ProjectRequest.GETS(1000);
  return <Wrapper items={projects?.results} />;
}
