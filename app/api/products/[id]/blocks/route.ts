import { NextRequest, NextResponse } from "next/server";

const apiKey: string = process.env.NEXT_PUBLIC_NOTION_API!;
const notionVersion: string = process.env.NEXT_PUBLIC_NOTION_VERSION!;
const notionEndpoint: string = process.env.NEXT_PUBLIC_NOTION_ENDPOINT!;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await fetch(`${notionEndpoint}/blocks/${id}/children`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": notionVersion,
      },
      next: {
        revalidate: 0,
      },
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch Notion data" }, { status: 500 });
  }
}
