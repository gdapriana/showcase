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

interface User {
  object: "user";
  id: string;
  // ... potentially other user fields
}

interface Parent {
  type: "database_id";
  database_id: string;
}

// --- Specific Property Value Types for the Database Schema ---

interface UrlPropertyValue {
  id: string;
  type: "url";
  url: string | null;
}

interface SelectOption {
  id: string;
  name: string;
  color: Color;
}

interface SelectPropertyValue {
  id: string;
  type: "select";
  select: SelectOption | null;
}

interface RichTextPropertyValue {
  id: string;
  type: "rich_text";
  rich_text: RichTextItem[];
}

interface TitlePropertyValue {
  id: "title";
  type: "title";
  title: RichTextItem[];
}

interface NumberPropertyValue {
  id: string;
  type: "number";
  number: number | null;
}

interface FormulaNumberValue {
  id: string;
  type: "formula";
  formula: {
    type: "number";
    number: number | null;
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
interface FilesPropertyValue {
  id: string;
  type: "files";
  files: NotionFile[];
}

interface RelationPropertyValue {
  id: string;
  type: "relation";
  relation: Array<{ id: string }>;
  has_more: boolean;
}

interface DateObject {
  start: string; // YYYY-MM-DD
  end: string | null;
  time_zone: string | null;
}

interface DatePropertyValue {
  id: string;
  type: "date";
  date: DateObject | null;
}

export interface MultiSelectOption {
  id: string;
  name: string;
  color: Color;
}

interface MultiSelectPropertyValue {
  id: string;
  type: "multi_select";
  multi_select: MultiSelectOption[];
}
interface StatusInfo {
  id: string;
  name: string;
  color: Color;
}
interface StatusPropertyValue {
  id: string;
  type: "status";
  status: StatusInfo | null;
}

interface EmailPropertyValue {
  id: string;
  type: "email";
  email: string | null;
}

interface CreatedTimePropertyValue {
  id: string;
  type: "created_time";
  created_time: string;
}

interface SkillPageProperties {
  site: UrlPropertyValue;
  icon: RichTextPropertyValue;
  level: SelectPropertyValue;
  name: TitlePropertyValue;
}

interface ProjectPageProperties {
  description: RichTextPropertyValue;
  end_value: NumberPropertyValue;
  progress: FormulaNumberValue;
  cover: FilesPropertyValue;
  github_repository: UrlPropertyValue;
  username: RelationPropertyValue;
  deploy_url: FilesPropertyValue;
  start_date: DatePropertyValue;
  start_value: NumberPropertyValue;
  tech: MultiSelectPropertyValue;
  status: StatusPropertyValue;
  name: TitlePropertyValue;
}

export interface MessagePageProperties {
  email: EmailPropertyValue;
  message: RichTextPropertyValue;
  created_at: CreatedTimePropertyValue;
  name: TitlePropertyValue;
}

export interface ToolPageProperties {
  name: TitlePropertyValue;
  icon: RichTextPropertyValue;
  description: RichTextPropertyValue;
  username: RelationPropertyValue;
}

export interface NotionPage {
  object: "page";
  id: string;
  created_time: string; // ISO 8601 date time
  last_edited_time: string; // ISO 8601 date time
  created_by: User;
  last_edited_by: User;
  cover: null;
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
  properties: SkillPageProperties | ProjectPageProperties | ToolPageProperties;
  url: string;
  public_url: string | null;
}

export interface NotionDatabaseQueryResponse {
  object: "list";
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
  type: "page_or_database";
  page_or_database: never;
  request_id: string;
}
