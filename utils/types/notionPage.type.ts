type Color = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

interface RichTextItem {
  type: "text";
  text: {
    content: string;
    link: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
  };
  plain_text: string;
  href: string | null;
}

interface ExternalFile {
  type: "external";
  external: {
    url: string;
  };
}

interface NotionFile {
  name: string;
  type: "file" | "external";
  file?: {
    url: string;
    expiry_time: string; // ISO 8601 date time
  };
  external?: {
    url: string;
  };
}

interface User {
  object: "user";
  id: string;
  // Note: User objects can be more detailed (e.g., name, avatar_url, type)
}

interface Parent {
  type: "database_id" | "page_id" | "block_id" | "workspace";
  database_id?: string;
  page_id?: string;
  block_id?: string;
  // workspace?
}

// --- Page Property Value Types ---

interface RichTextPropertyValue {
  id: string;
  type: "rich_text" | "title" | "email" | "phone_number" | "url";
  rich_text: RichTextItem[];
}

interface TitlePropertyValue {
  id: "title";
  type: "title";
  title: RichTextItem[];
}

interface FormulaNumberValue {
  id: string;
  type: "formula";
  formula: {
    type: "number";
    number: number;
  };
}

interface MultiSelectOption {
  id: string;
  name: string;
  color: Color;
}

interface MultiSelectPropertyValue {
  id: string;
  type: "multi_select";
  multi_select: MultiSelectOption[];
}

interface NumberPropertyValue {
  id: string;
  type: "number";
  number: number | null;
}

interface FilesPropertyValue {
  id: string;
  type: "files";
  files: NotionFile[];
}

// --- Union Type for all possible Property Values observed in the response ---

type PagePropertyValue = RichTextPropertyValue | TitlePropertyValue | FormulaNumberValue | MultiSelectPropertyValue | FilesPropertyValue;

// --- Properties Object Type ---

// This models the specific properties from your response.
// The key is the property name, and the value is the corresponding PagePropertyValue type.
interface PageProperties {
  address: RichTextPropertyValue;
  province: RichTextPropertyValue;
  city: RichTextPropertyValue;
  page_id: RichTextPropertyValue;
  age: FormulaNumberValue;
  first_name: RichTextPropertyValue;
  full_name: RichTextPropertyValue;
  country: RichTextPropertyValue;
  tags: MultiSelectPropertyValue;
  last_name: RichTextPropertyValue;
  profile_img: FilesPropertyValue;
  description: RichTextPropertyValue; // Assuming rich_text: []
  email: RichTextPropertyValue;
  cv_url: RichTextPropertyValue; // Assuming rich_text: []
  phone_number: RichTextPropertyValue;
  username: TitlePropertyValue;
  logo: FilesPropertyValue;
  experience: NumberPropertyValue;
}

// --- Main Page Object Type ---

export interface NotionPageResponse {
  object: "page";
  id: string;
  created_time: string; // ISO 8601 date time
  last_edited_time: string; // ISO 8601 date time
  created_by: User;
  last_edited_by: User;
  cover: ExternalFile | null;
  icon: {
    type: "external";
    external: {
      url: string;
    };
  } | null;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;
  properties: PageProperties; // Using the defined specific properties structure
  url: string;
  public_url: string | null;
  request_id: string;
}
