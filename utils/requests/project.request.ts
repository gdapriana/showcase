import { dbID } from "@/utils/database";
import { NotionDatabaseQueryResponse } from "@/utils/types/notionDatabaseQuery.type";

const apiKey: string = process.env.NEXT_PUBLIC_NOTION_API!;
const activeUser: string = process.env.NEXT_PUBLIC_ACTIVE_USER_ID!;
const notionVersion: string = process.env.NEXT_PUBLIC_NOTION_VERSION!;
const notionEndpoint: string = process.env.NEXT_PUBLIC_NOTION_ENDPOINT!;

export class ProjectRequest {
  static async GETS(count: number = 6): Promise<NotionDatabaseQueryResponse | null> {
    try {
      const response = await fetch(`${notionEndpoint}/databases/${dbID.projects}/query`, {
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
          page_size: count,
        }),
        next: {
          revalidate: 0,
        },
        cache: "no-store",
      });
      const data = await response.json();

      if (data.status === 400 || data.status === 401 || data.status === 403 || data.status === 404) return null;
      return data;
    } catch (error) {
      return null;
    }
  }
}
