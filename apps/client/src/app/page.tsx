import { Blog, getAvatar, getBlogs, getImage } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";
import AllBlogs from "./components/AllBlogs";
import Avatar from "./components/Avatar";

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const stringMonth = date.toLocaleString("es-ES", { month: "long" }).slice(0, 3);
  const getYear = date.getFullYear();

  return `${stringMonth} ${day}, ${getYear}`;
};

const BlogCard = ({ title, cover, author, slug, description, category }: Blog["attributes"]) => {
  return (
    <article className="py-4 flex w-full gap-6">
      <div className="relative w-[50%]">
        <Image
          alt={title}
          className="rounded-2xl mb-2 object-cover"
          height={400}
          src={getImage({ cover: cover })}
          width={650}
        />
        <Link
          className="absolute bg-white gap-0 rotate-45 top-4 right-4 text-8xl text-black inline-flex items-center justify-center h-10 w-10 rounded-full hover:scale-125 transition-transform cursor-pointer"
          href={`/blog/${slug}`}
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M12 5l0 14" />
            <path d="M16 9l-4 -4" />
            <path d="M8 9l4 -4" />
          </svg>
        </Link>
      </div>
      <div className="justify-between py-4 flex flex-col w-[50%]">
        <div>
          <span className="text-[10px] font-medium mr-2 py-0.5 rounded text-purple-400">
            {category.data.attributes.name}
            {" • "}5 min de lectura
          </span>
          <h2 className={`mb-4 text-4xl leading-snug font-semibold`}>{title}</h2>
          <p className={`text-base opacity-50`}>{description}</p>
        </div>
        <Avatar
          name={author.data.attributes.name}
          picture={getAvatar({ author: author })}
          publishedAt={new Date()}
        />
      </div>
    </article>
  );
};

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <main className="mt-12 mx-auto max-w-screen-xl">
      <div className="flex flex-col border-t border-neutral-700 border-b py-6 px-16 mb-6 items-center gap-2">
        <h2 className="text-9xl font-bold text-white">BLOG</h2>
        <p className="text-lg uppercase tracking-widest font-semibold text-white">
          Desarrollo asistido por software
        </p>
      </div>
      <section className="flex w-full">
        <BlogCard {...blogs[0]} />
      </section>
      <AllBlogs blogs={blogs} />
    </main>
  );
}
