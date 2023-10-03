import { Blog, getAvatar, getBlogs, getImage } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";
import AllBlogs from "./components/AllBlogs";
import Avatar from "./components/Avatar";
import PageWrapper from "./components/PageWrapper";
import { readingTimeOfBlog } from "./utils/helpers";
import Search from "./components/Search";
import React from "react";
import CategoriesNavigation from "./components/CategoriesNavigation";
import { URL_CLIENT } from "./config";

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const stringMonth = date.toLocaleString("es-ES", { month: "long" }).slice(0, 3);
  const getYear = date.getFullYear();

  return `${stringMonth} ${day}, ${getYear}`;
};

const BlogCard = ({
  title,
  cover,
  author,
  slug,
  description,
  category,
  blocks,
  publishedAt,
}: Blog["attributes"]) => {
  return (
    <article className="py-4 flex flex-col w-full md:flex-row md:gap-6">
      <div className="relative md:w-[50%] w-full">
        <Image
          alt={title}
          className="rounded-2xl border-white/10 dark:border-black/10 border-2 mb-2 object-cover"
          height={400}
          src={getImage({ cover: cover })}
          width={650}
        />
        <Link
          className="absolute bg-amber-500 hover:bg-amber-600 gap-0 rotate-45 top-4 right-4 text-8xl text-neutral-100 dark:text-neutral-900 inline-flex items-center justify-center h-10 w-10 rounded-full hover:scale-125 transition-transform cursor-pointer"
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
      <div className="justify-between py-0 px-2 md:px-0 md:py-4 flex flex-col w-full md:w-[50%]">
        <div>
          <span className="text-[10px] font-medium mr-2 py-0.5 rounded text-amber-500">
            {category.data.attributes.name}
            {" • "}
            {readingTimeOfBlog(blocks).readingTime} min
          </span>
          <h2
            className={`mb-4 text-4xl leading-snug font-semibold text-neutral-100 dark:text-neutral-900`}
          >
            {title}
          </h2>
          <p className={`text-base opacity-50 text-neutral-100 dark:text-neutral-900`}>
            {description}
          </p>
        </div>
        <Avatar
          name={author.data.attributes.name}
          picture={getAvatar({ author: author })}
          publishedAt={new Date(publishedAt)}
        />
      </div>
    </article>
  );
};

export default async function Home({
  searchParams: { search, category },
}: {
  searchParams: { search: string; category: string };
}) {
  const blogsRaw = await getBlogs();
  const blogs = blogsRaw.slice(1);
  const categories: [string] = blogsRaw.map((blog: any) => blog.category.data.attributes.name);

  const multipleSearch = (array: [any]) => {
    if (!search && !category) return array;
    return array.filter(
      (blog) =>
        Object.keys(blog).some((parameter) =>
          blog[parameter]
            .toString()
            .toLowerCase()
            .includes(search?.toLowerCase() || ""),
        ) &&
        blog.category.data.attributes.name.toLowerCase().includes(category?.toLowerCase() || ""),
    );
  };
  const filteredBlogs: any = multipleSearch(search ? blogsRaw : blogs);

  return (
    <PageWrapper>
      <main className="mt-12 mx-auto max-w-screen-xl px-4">
        <div className="flex relative flex-col dark:border-neutral-700/20 border-white/20 border-b-2 py-6 px-16 mb-6 items-center gap-2">
          <h2 className="text-5xl md:text-9xl font-bold text-neutral-100 dark:text-neutral-900">
            BLOG
          </h2>
          <p className="text-xs md:text-lg text-center mb-4 md:mb-0 uppercase tracking-widest font-semibold text-neutral-100 dark:text-neutral-900">
            Desarrollo asistido por software
          </p>
          <section className="absolute md:bottom-6 bottom-2 right-0">
            <a
              className="text-xs border-2 border-white/20 bg-amber-400 text-black dark:border-black/20 rounded-md hover:bg-amber-500 hover:dark:bg-amber-500 font-bold transition-all inline-flex px-2.5 py-1 items-center gap-2"
              href={`${URL_CLIENT}/admin`}
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <span className="transition-transform">+</span>
              Crear un nuevo post
            </a>
          </section>
        </div>
        <aside className="md:w-1/2 mx-auto">
          <Search />
        </aside>
        <CategoriesNavigation categories={categories} />
        {!search && !category && (
          <section className="flex w-full">
            <BlogCard {...blogsRaw[0]} />
          </section>
        )}
        {filteredBlogs.length > 0 ? (
          <AllBlogs blogs={filteredBlogs} />
        ) : (
          <section className="flex flex-col py-48 gap-1">
            <span className="text-4xl text-center font-bold text-neutral-100 dark:text-neutral-900">
              Oops!
            </span>
            <h2 className="text-xl text-center font-medium text-neutral-100 dark:text-neutral-900">
              No se encontraron blogs
            </h2>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}
