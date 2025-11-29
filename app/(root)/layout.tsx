import { ReactNode } from "react";
import Navbar from "@/app/(root)/_components/navbar";
import { NotionPageResponse } from "@/utils/types/notionPage.type";
import { ProfileRequest } from "@/utils/requests/profile.request";
import { notFound } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const user: NotionPageResponse | null = await ProfileRequest.GET();
  if (user === null) {
    return notFound();
  }
  return (
    <main>
      <Navbar logo={user?.properties.logo.files[0].file?.url} />
      {children}

      <div className="h-[200vh]"></div>
    </main>
  );
}
