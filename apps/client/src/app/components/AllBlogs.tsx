"use client";
import { Blog, getAvatar, getImage } from "@/lib/blogs";
import React from "react";
import Avatar from "./Avatar";
import WrapperBlogs from "./WrapperBlogs";
import { readingTimeOfBlog } from "../utils/helpers";
import { useRouter } from "next/navigation";

interface Props {
  blogs: Blog["attributes"][];
}

const AllBlogs: React.FC<Props> = ({ blogs }) => {
  const router = useRouter();
  return (
    <section className="my-6">
      <div className="relative mb-16">
        <h2 className="text-5xl z-50 font-bold text-neutral-100 dark:text-neutral-900">
          Nuevos blogs
        </h2>
      </div>
      <WrapperBlogs>
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="w-full h-full relative flex flex-col group image-gallery cursor-pointer"
            onClick={() => router.push(`/blog/${blog.slug}`)}
          >
            <div className="relative flex-1 w-full h-px">
              <img
                alt={blog.title}
                className="rounded-2xl object-cover w-full h-full border-white/10 dark:border-black/10 border-2"
                src={getImage({ cover: blog.cover })}
              />
              <span className="absolute bg-amber-400 group-hover:bg-amber-500 gap-0 rotate-180 top-4 right-4 text-8xl text-neutral-100 dark:text-neutral-900 inline-flex items-center justify-center h-10 w-10 rounded-full group-hover:scale-125 transition-transform cursor-pointer">
                <svg
                  fill="none"
                  height={24}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  width={24}
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M17 7 7 17M16 17H7V8" />
                </svg>
              </span>
            </div>
            <div className="p-4 justify-evenly flex flex-col">
              <span className="text-[10px] font-medium mr-2 py-0.5 rounded text-amber-500">
                {blog.category.data.attributes.name}
                {" • "}
                {readingTimeOfBlog(blog.blocks).readingTime} min
              </span>
              <h2
                className={`mb-1 text-xl font-medium text-neutral-200 group-hover:text-neutral-100 group-hover:dark:text-neutral-950 dark:text-neutral-900 transition-colors`}
              >
                {blog.title}
              </h2>
              <p
                className={`text-sm mb-6 opacity-50 line-clamp-2 text-neutral-100 dark:text-neutral-900`}
              >
                {blog.description}
              </p>
              <Avatar
                name={blog.author.data.attributes.name}
                picture={getAvatar({ author: blog.author })}
                publishedAt={new Date(blog.publishedAt)}
              />
            </div>
          </article>
        ))}
      </WrapperBlogs>
    </section>
  );
};

export default AllBlogs;
