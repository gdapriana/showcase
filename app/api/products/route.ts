import { NextResponse } from "next/server";
import { dbID } from "@/utils/database";

const apiKey: string = process.env.NEXT_PUBLIC_NOTION_API!;
const activeUser: string = process.env.NEXT_PUBLIC_ACTIVE_USER_ID!;
const notionVersion: string = process.env.NEXT_PUBLIC_NOTION_VERSION!;
const notionEndpoint: string = process.env.NEXT_PUBLIC_NOTION_ENDPOINT!;

export async function GET() {
  try {
    const response = await fetch(
      `${notionEndpoint}/databases/${dbID.products}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": notionVersion,
        },
        body: JSON.stringify({
          filter: {
            property: "username",
            relation: {
              contains: activeUser,
            },
          },
          page_size: 100,
        }),
        next: {
          revalidate: 0,
        },
        cache: "no-store",
      },
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch Notion data" },
      { status: 500 },
    );
  }
}
