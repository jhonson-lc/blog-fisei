import { API_URL, URL_CLIENT } from "../app/config";

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
  const res = await fetch(
    `${API_URL}/articles?populate[author][populate][0]=avatar&populate[cover][populate][1]=cover&populate[category][populate][2]=category`,
    {
      next: {
        revalidate: 1,
      },
    },
  );
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

export const getImage = ({ cover }: { cover: Blog["attributes"]["cover"] }) => {
  return `${URL_CLIENT}${cover.data.attributes.url}`;
};

export const getAvatar = ({ author }: { author: Blog["attributes"]["author"] }) => {
  return `${URL_CLIENT}${author.data.attributes.avatar.data.attributes.url}`;
};
