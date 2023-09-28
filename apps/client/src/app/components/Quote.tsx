interface QuoteProps {
  data: {
    title: string;
    body: string;
    author: string;
  };
}

export default function Quote({ data }: QuoteProps) {
  const { title, body, author } = data;

  return (
    <div className="flex flex-col relative items-end mx-0 mb-4">
      {author && <p className="px-6">{author}</p>}
      <div className="relative text-start self-start">
        {/* <svg
          className="absolute top-0 -left-4 w-4 h-4 dark:text-gray-700"
          fill="currentColor"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z" />
          <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z" />
        </svg> */}
        <p className="px-6 py-2 text-sm italic text-neutral-100 dark:text-neutral-900">{body}</p>
        {/* <svg
          className="absolute bottom-0 -right-4 w-4 h-4 dark:text-gray-700"
          fill="currentColor"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z" />
        <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z" />
      </svg> */}
      </div>
      <span className="w-1 absolute left-0 h-full my-2 bg-yellow-400" />
      {title && <h2 className="px-6 mt-2 text-xs font-bold italic text-end self-end">{title}</h2>}
    </div>
  );
}
