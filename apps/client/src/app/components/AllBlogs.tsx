import { Blog, getAvatar, getImage } from "@/lib/blogs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";

interface Props {
  blogs: Blog["attributes"][];
}

const AllBlogs: React.FC<Props> = ({ blogs }) => {
  console.log(blogs);
  return (
    <section className="my-6">
      <div className="relative mb-8">
        <h2 className="text-5xl z-50 font-bold">Nuevos blogs</h2>
        <span className="absolute opacity-10 -z-50 top-1/2 -translate-y-1/2 -left-6 text-8xl font-bold">
          Blogs
        </span>
      </div>
      <article className="grid grid-cols-3 gap-4 w-full">
        {blogs.map((blog) => (
          <article key={blog.slug} className="py-4 relative">
            <div className="relative w-full h-60">
              <Image
                alt={blog.title}
                className="rounded-2xl object-cover"
                fill={true}
                src={getImage({ cover: blog.cover })}
              />
              <Link
                className="absolute bg-white gap-0 rotate-45 top-4 right-4 text-8xl text-black inline-flex items-center justify-center h-10 w-10 rounded-full hover:scale-125 transition-transform cursor-pointer"
                href={`/blog/${blog.slug}`}
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
            <div className="p-4 justify-between flex flex-col">
              <div className="flex flex-col">
                <h2 className={`mb-1 text-2xl font-semibold`}>{blog.title}</h2>
                <p className={`text-base mb-6 opacity-50 line-clamp-2`}>{blog.description}</p>
              </div>
              <Avatar
                name={blog.author.data.attributes.name}
                picture={getAvatar({ author: blog.author })}
                publishedAt={new Date()}
              />
            </div>
          </article>
        ))}
      </article>
    </section>
  );
};

export default AllBlogs;
