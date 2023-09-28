import { getStrapiURL } from "@/app/utils/helpers";
import { API_URL, URL_CLIENT } from "../app/config";
import qs from "qs";

export type BlogPagination = {
  title: string;
  slug: string;
} | null;

export type Blog = {
  id: string;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    author: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    category: any;
    blocks: any;
  };
};

export const getBlogs = async () => {
  const urlParamsObject = {
    populate: {
      cover: { fields: ["url"] },
      author: { populate: "*" },
      category: { fields: ["name"] },
      blocks: {
        populate: "*",
        on: {
          "shared.rich-text": {
            populate: "*",
          },
          "shared.quote": {
            populate: "*",
          },
          "shared.media": {
            populate: "*",
          },
          "shared.slider": {
            populate: "*",
          },
          "shared.video-embed": {
            populate: "*",
          },
        },
      },
    },
  };
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/articles${queryString ? `?${queryString}` : ""}`)}`;

  const res = await fetch(requestUrl, {
    next: {
      revalidate: 1,
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const { data } = await res.json();

  const blogs = data.map(({ attributes, id }: Blog) => {
    return {
      id: id,
      title: attributes.title,
      description: attributes.description,
      slug: attributes.slug,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      publishedAt: attributes.publishedAt,
      cover: attributes.cover,
      author: attributes.author,
      category: attributes.category,
      blocks: attributes.blocks,
    };
  });

  return blogs;
};

export const getSingleBlog = async ({ slug }: { slug: string }) => {
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      author: { populate: "*" },
      category: { fields: ["name"] },
      blocks: {
        populate: "*",
        on: {
          "shared.rich-text": {
            populate: "*",
          },
          "shared.quote": {
            populate: "*",
          },
          "shared.media": {
            populate: "*",
          },
          "shared.slider": {
            populate: "*",
          },
          "shared.video-embed": {
            populate: "*",
          },
        },
      },
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/articles${queryString ? `?${queryString}` : ""}`)}`;
  const blogs = await getBlogs();

  let previousBlog: BlogPagination = null;
  let nextBlog: BlogPagination = null;

  for (const single of blogs) {
    if (single.slug === slug[0]) {
      previousBlog = blogs[blogs.indexOf(single) - 1];
      nextBlog = blogs[blogs.indexOf(single) + 1];
    }
  }

  const singleBlog = await fetch(requestUrl, {
    next: {
      revalidate: 1,
    },
  });

  if (!singleBlog.ok) {
    throw new Error("Something wrong bad");
  }

  const { data } = await singleBlog.json();

  const blog = data[0];

  return {
    data: blog,
    previousBlog,
    nextBlog,
  };
};

export const getNextBlog = async ({ slug }: { slug: string }) => {};

export const getImage = ({ cover }: { cover: Blog["attributes"]["cover"] }) => {
  return `${URL_CLIENT}${cover.data.attributes.url}`;
};

export const getAvatar = ({ author }: { author: Blog["attributes"]["author"] }) => {
  return `${URL_CLIENT}${author.data.attributes.avatar.data.attributes.url}`;
};
