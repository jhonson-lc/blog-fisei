"use client";
import { Fade } from "react-slideshow-image";
import { getStrapiMedia } from "../utils/helpers";
import Image from "next/image";
import "react-slideshow-image/dist/styles.css";

interface Image {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface SlidShowProps {
  files: {
    data: Image[];
  };
}

export default function Slideshow({ data }: { data: SlidShowProps }) {
  return (
    <div className="slide-container">
      <Fade>
        {data?.files?.data.map((fadeImage: Image, index) => {
          const imageUrl = getStrapiMedia(fadeImage.attributes.url);
          return (
            <div key={index}>
              {imageUrl && (
                <Image
                  alt="alt text"
                  className="w-full h-96 object-cover rounded-2xl border-white/10 dark:border-black/10 border-2"
                  height={400}
                  src={imageUrl}
                  width={600}
                />
              )}
            </div>
          );
        })}
      </Fade>
    </div>
  );
}
