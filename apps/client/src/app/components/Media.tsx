import { getStrapiMedia } from "../utils/helpers";
import Image from "next/image";

interface MediaProps {
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
      };
    };
  };
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  return (
    <div className="flex items-center justify-center mt-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <Image
        alt={data.file.data.attributes.alternativeText || "none provided"}
        className="object-cover w-full h-full rounded-2xl border-white/10 dark:border-black/10 border-2 overflow-hidden"
        height={400}
        src={imgUrl || ""}
        width={400}
      />
    </div>
  );
}
