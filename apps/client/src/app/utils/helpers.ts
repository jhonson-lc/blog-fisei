import readingTime from "reading-time";
import { API_URL, URL_CLIENT } from "../config";

export function getStrapiURL(path = "") {
  return `${API_URL || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${URL_CLIENT}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

type Result = {
  wordCount: number;
  readingTime: number;
};

export function readingTimeOfBlog(blocks: any[]) {
  const allText = blocks.map((block) => block.body).join(" ");
  const stats = readingTime(allText);
  return {
    wordCount: stats.words,
    readingTime: Math.ceil(stats.minutes),
  };
}
