/* eslint-disable react/no-children-prop */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  return (
    <section className="py-6 flex flex-col">
      <section className="rich-text text-gray-200">
        <ReactMarkdown children={data.body} remarkPlugins={[remarkGfm]} />
      </section>
    </section>
  );
}
