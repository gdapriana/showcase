import { NotionPageResponse } from "@/utils/types/notionPage.type";

export default function Footer({ user }: { user: NotionPageResponse | null }) {
  return (
    <footer className="sticky z-1 bottom-0 bg-primary flex justify-center items-center px-4">
      <div className="max-w-[800px] bg-primary rounded-2xl md:py-16 py-10 relative w-full flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-8 border-b border-muted-foreground/20 pb-10 w-full flex-col md:flex-row justify-start items-start md:justify-between md:items-start">
          <div className="flex gap-1 flex-col justify-start items-start">
            <h2 className="text-background tracking-[-2px] text-2xl font-bold">{user?.properties.username.title[0].plain_text}</h2>
            <a href={`mailto:${user?.properties.email.rich_text[0].plain_text}`} className="text-muted-foreground text-sm">
              {user?.properties.email.rich_text[0].plain_text}
            </a>
          </div>

          <div className="flex gap-1 justify-start flex-col items-start md:items-end">
            <a className="text-background tracking-[-1px] font-semibold text-lg" href="/projects">
              Projects
            </a>
            <a className="text-background tracking-[-1px] font-semibold text-lg" href="/educations">
              Educations
            </a>
            <a className="text-background tracking-[-1px] font-semibold text-lg" href="/certificates">
              Certificates
            </a>
            <a className="text-background tracking-[-1px] font-semibold text-lg" href="/experiences">
              Experiences
            </a>
          </div>
        </div>
        <div className="p-2 text-muted-foreground text-center">© {new Date().getFullYear()} Gede Apriana — Designed & Developed with passion. All rights reserved.</div>
      </div>
    </footer>
  );
}
