import Hero from "@/app/(root)/_components/hero";
import { ProfileRequest } from "@/utils/requests/profile.request";
import { notFound } from "next/navigation";
import { NotionPageResponse } from "@/utils/types/notionPage.type";
import BookCall from "@/app/(root)/_components/book-call/book-call";
import { SkillRequest } from "@/utils/requests/skill.request";
import { Suspense } from "react";
import CurrentProject from "@/app/(root)/_components/current-project/current-project";
import { ProjectRequest } from "@/utils/requests/project.request";
import MessageForm from "@/app/(root)/_components/message-form/message-form";

export default async function Home() {
  const user: NotionPageResponse | null = await ProfileRequest.GET();

  if (user === null) {
    return notFound();
  }

  const [skills, projects] = await Promise.all([SkillRequest.GETS(), ProjectRequest.GETS()]);

  return (
    <div>
      <Suspense key={user.id}>
        <Hero user={user} />
      </Suspense>
      <Suspense key={skills?.request_id}>
        <BookCall skills={skills?.results} />
      </Suspense>
      <Suspense key={projects?.request_id}>
        <CurrentProject projects={projects?.results} />
      </Suspense>
      <MessageForm />
    </div>
  );
}
