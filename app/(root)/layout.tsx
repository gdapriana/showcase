import { ReactNode } from "react";
import Navbar from "@/app/(root)/_components/navbar";
import { NotionPageResponse } from "@/utils/types/notionPage.type";
import { ProfileRequest } from "@/utils/requests/profile.request";
import { notFound } from "next/navigation";
import Footer from "@/app/(root)/_components/footer";
import SVG from "@/app/(root)/_components/svg";

export default async function Layout({ children }: { children: ReactNode }) {
  const user: NotionPageResponse | null = await ProfileRequest.GET();
  if (user === null) {
    return notFound();
  }
  return (
    <main className="flex flex-col justify-start items-stretch">
      <div className="z-10 bg-background relative flex flex-col justify-start items-stretch">
        {/* <SVG /> */}
        <Navbar email={user?.properties.email.rich_text[0].plain_text} logo={user?.properties.logo.files[0].file?.url} />
        {children}
      </div>
      <Footer user={user} />
    </main>
  );
}
