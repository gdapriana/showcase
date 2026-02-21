export const NotionText = ({ text }: { text: any[] }) => {
  if (!text) return null;
  return (
    <>
      {text.map((item, i) => {
        const {
          annotations: { bold, italic, strikethrough, underline, code, color },
          plain_text,
          href,
        } = item;
        return (
          <span
            key={i}
            className={`
              ${bold ? "font-bold" : ""}
              ${italic ? "italic" : ""}
              ${strikethrough ? "line-through" : ""}
              ${underline ? "underline" : ""}
              ${code ? "rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-pink-500" : ""}
            `}
            style={color !== "default" ? { color } : {}}
          >
            {href ? (
              <a href={href} className="text-blue-600 underline">
                {plain_text}
              </a>
            ) : (
              plain_text
            )}
          </span>
        );
      })}
    </>
  );
};
