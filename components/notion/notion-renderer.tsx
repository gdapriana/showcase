import { NotionText } from "@/components/notion/notion-text";

export const NotionRenderer = ({ blocks }: { blocks: any[] }) => {
  return (
    <div className="flex text-sm flex-col gap-4 w-full">
      {blocks.map((block) => {
        const { type, id } = block;
        const value = block[type];

        switch (type) {
          case "paragraph":
            return (
              <p key={id}>
                <NotionText text={value.rich_text} />
              </p>
            );
          case "heading_1":
            return (
              <h1 key={id} className="text-xl font-bold mt-8 mb-2">
                <NotionText text={value.rich_text} />
              </h1>
            );
          case "heading_2":
            return (
              <h2 key={id} className="text-lg font-semibold mt-6 mb-2">
                <NotionText text={value.rich_text} />
              </h2>
            );
          case "bulleted_list_item":
          case "numbered_list_item":
            return (
              <li key={id} className="ml-6 list-disc">
                <NotionText text={value.rich_text} />
              </li>
            );
          case "image":
            const src = value.type === "external" ? value.external.url : value.file.url;
            return (
              <figure key={id} className="my-4">
                <img src={src} alt="Notion Image" className="rounded-lg w-full" />
                {value.caption && (
                  <figcaption className="text-sm mt-2">
                    <NotionText text={value.caption} />
                  </figcaption>
                )}
              </figure>
            );
          default:
            return (
              <div key={id} className="text-red-400 hidden text-xs text-opacity-50">
                Unsupported block: {type}
              </div>
            );
        }
      })}
    </div>
  );
};
