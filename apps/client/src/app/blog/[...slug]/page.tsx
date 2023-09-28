import { formatDate, readingTimeOfBlog } from "@/app/utils/helpers";
import { postRenderer } from "@/app/utils/post-renderer";
import { getImage, getSingleBlog } from "@/lib/blogs";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { icons } from "../../icons";
import PageWrapper from "@/app/components/PageWrapper";

interface Props {
  params: {
    slug: string;
  };
}

const SingleBlog: NextPage<Props> = async ({ params }) => {
  const { data, nextBlog, previousBlog } = await getSingleBlog({
    slug: params.slug,
  });

  const { title, publishedAt, category, author } = data.attributes;
  const { name } = category.data.attributes;
  const imageUrl = getImage({ cover: data.attributes.cover });

  if (!data) return <h2>no post found</h2>;

  return (
    <PageWrapper>
      <section className="flex max-h-[95vh] h-screen justify-center p-6 m-4 border-neutral-700 dark:border-neutral-300 items-center border-2 rounded-2xl overflow-hidden">
        <section className="w-[35%] p-6 border-r h-full border-dashed dark:border-neutral-500 border-neutral-100/50">
          <div className="flex items-center justify-between">
            <span className="bg-white text-neutral-700 dark:text-neutral-100 px-2.5 py-px rounded-md dark:bg-black">
              {name}
            </span>
            <Link className="dark:text-neutral-900 text-neutral-100" href={`/?category=${name}`}>
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
                <path d="M9 15l6 -6" />
                <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
              </svg>
            </Link>
          </div>
          <h2 className="text-4xl leading-snug dark:text-neutral-900 text-neutral-100 font-semibold pb-4 pt-4">
            {title}
          </h2>
          <div className="h-52 w-full relative">
            <Image
              alt={title}
              className="object-cover border-white/10 dark:border-black/10 border-2 rounded-2xl"
              fill={true}
              src={imageUrl}
            />
          </div>
          <article className="border-2 border-white/30 dark:text-neutral-900 text-neutral-100 dark:border-black/30 p-6 flex flex-col gap-2 mt-10 text-xs rounded-2xl">
            <div className="flex justify-between">
              <span>Categoría:</span>
              <span className="text-xs">{name}</span>
            </div>
            <div className="flex justify-between">
              <span>Publicado:</span>
              <span className="text-xs">{formatDate(publishedAt)}</span>
            </div>
            <div className="flex justify-between">
              <span>Autor:</span>
              <span className="text-xs">{author.data.attributes.name}</span>
            </div>
            <div className="flex dark:text-neutral-900 text-neutral-100 font-bold justify-between">
              <span>Tiempo de lectura:</span>
              <span className="text-xs">
                {readingTimeOfBlog(data.attributes.blocks).readingTime} min
              </span>
            </div>
          </article>
          <Link
            className="text-xs mt-24 border-2 border-white/20 dark:border-black/20 rounded-md text-neutral-100 hover:bg-yellow-500/20 hover:dark:bg-yellow-600/10 dark:text-neutral-900 font-bold transition-all inline-flex px-2.5 py-1 items-center gap-2"
            href={"/"}
          >
            <span className="transition-transform">{icons.Home}</span>
            Inicio
          </Link>
        </section>
        <section className="w-[75%] px-12 h-full overflow-auto">
          <aside
            className="flex justify-between items-center w-full my-4 px-6 pb-40 pt-6 bg-yellow-500 rounded-2xl"
            id="navigation"
          >
            {!previousBlog && <div />}
            {previousBlog && (
              <Link
                className="text-xs group text-neutral-900 dark:text-white font-bold py-2 rounded-md transition-all inline-flex items-center gap-2"
                href={`/blog/${previousBlog.slug}`}
              >
                <span className="transition-transform group-hover:scale-150">
                  {icons.ChevronLeft}
                </span>
                {previousBlog.title}
              </Link>
            )}
            {nextBlog && (
              <Link
                className="text-xs group text-neutral-900 dark:text-white font-bold py-2 rounded-md transition-all inline-flex items-center gap-2"
                href={`/blog/${nextBlog.slug}`}
              >
                {nextBlog.title}
                <span className="rotate-180 group-hover:scale-150 transition-transform">
                  {icons.ChevronLeft}
                </span>
              </Link>
            )}
          </aside>
          <section className="bg-black dark:bg-white rounded-2xl mx-12 px-16 py-8 relative -top-36">
            {data.attributes.blocks.length === 0 && (
              <div className="flex justify-center items-center h-80">
                <h2 className="text-xl font-bold text-white dark:text-black">No hay contenido</h2>
              </div>
            )}
            {data.attributes.blocks.map((section: any, index: number) =>
              postRenderer(section, index),
            )}
          </section>
        </section>
      </section>
    </PageWrapper>
  );
};

export default SingleBlog;
