import { dbID } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { count = 6 } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_NOTION_ENDPOINT}/databases/${dbID.projects}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_API}`,
      "Content-Type": "application/json",
      "Notion-Version": process.env.NEXT_PUBLIC_NOTION_VERSION!,
    },
    body: JSON.stringify({
      filter: {
        property: "username",
        relation: { contains: process.env.NEXT_PUBLIC_ACTIVE_USER_ID },
      },
      page_size: count,
    }),
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data);
}
