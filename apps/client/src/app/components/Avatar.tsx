import React from "react";
import Image from "next/image";
import { formatDate } from "../page";

interface Props {
  name: string;
  picture: string;
  publishedAt: Date;
}

const Avatar: React.FC<Props> = ({ name, picture, publishedAt }) => {
  return (
    <div className="mb-2 inline-flex gap-2 items-center">
      <div className="w-8 h-8 relative">
        <Image alt={name} className="rounded-full object-cover" fill={true} src={picture} />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-neutral-100 dark:text-neutral-900 text-[9px] flex items-center">
          {name}
        </span>
        <span className="text-[10px] text-neutral-500 capitalize tracking-wide">
          {formatDate(publishedAt)}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
