import { NotionPageResponse } from "@/utils/types/notionPage.type";

const apiKey: string = process.env.NEXT_PUBLIC_NOTION_API!;
const activeUser: string = process.env.NEXT_PUBLIC_ACTIVE_USER_ID!;
const notionVersion: string = process.env.NEXT_PUBLIC_NOTION_VERSION!;
const notionEndpoint: string = process.env.NEXT_PUBLIC_NOTION_ENDPOINT!;

export class ProfileRequest {
  static async GET(): Promise<NotionPageResponse | null> {
    try {
      const response = await fetch(`${notionEndpoint}/pages/${activeUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": notionVersion,
        },
        next: {
          revalidate: 60,
        },
      });
      const data = await response.json();

      if (data.status === 400 || data.status === 401 || data.status === 403 || data.status === 404) return null;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
