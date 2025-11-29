import { dbID } from "@/utils/database";
import { NextResponse } from "next/server";

const apiKey: string = process.env.NEXT_PUBLIC_NOTION_API!;
const activeUser: string = process.env.NEXT_PUBLIC_ACTIVE_USER_ID!;
const notionVersion: string = process.env.NEXT_PUBLIC_NOTION_VERSION!;
const notionEndpoint: string = process.env.NEXT_PUBLIC_NOTION_ENDPOINT!;

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const notionRes = await fetch(`${notionEndpoint}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": notionVersion,
    },
    body: JSON.stringify({
      parent: {
        database_id: dbID.messages,
      },
      icon: {
        type: "external",
        external: {
          url: "https://www.notion.so/icons/mail_blue.svg",
        },
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        email: {
          email: email,
        },
        message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        username: {
          relation: [
            {
              id: activeUser,
            },
          ],
        },
      },
    }),
  });

  const data = await notionRes.json();
  return NextResponse.json(data);
}
