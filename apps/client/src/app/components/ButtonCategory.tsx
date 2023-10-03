"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React from "react";
import { getRandomColor } from "../lib/get-random-color";

interface Props {
  title: string;
  onClick: () => void;
}

const ButtonCategory: React.FC<Props> = ({ onClick, title }) => {
  const colorRandom: string = getRandomColor();
  const pathname = useSearchParams();
  const active = pathname.get("category") === title.toLowerCase();
  const DynamicTag = active ? "div" : "button";

  return (
    <DynamicTag
      className={clsx(
        "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group",
        colorRandom,
      )}
      onClick={onClick}
    >
      <span
        className={clsx(
          "relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0",
          active
            ? "bg-opacity-0 text-neutral-100"
            : "dark:bg-white bg-black text-neutral-100 dark:text-neutral-900 hover:dark:text-neutral-100",
        )}
      >
        {title}
      </span>
    </DynamicTag>
  );
};

export default ButtonCategory;
