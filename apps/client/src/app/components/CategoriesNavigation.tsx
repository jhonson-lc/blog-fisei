"use client";
import React from "react";
import { useSearchCategory } from "../hooks/useSearchCategory";
import classnames from "classnames";

interface Props {
  categories: [string];
}

const colors = [
  "bg-gradient-to-br from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 text-neutral-100 dark:text-neutral-900",
  "bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-neutral-100 dark:text-neutral-900",
  "bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-neutral-100 dark:text-neutral-900",
  "bg-gradient-to-br from-pink-500 to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 text-neutral-100 dark:text-neutral-900",
  "bg-gradient-to-br from-teal-300 to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 text-neutral-100 dark:hover:text-neutral-100 dark:text-neutral-900",
  "bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 text-neutral-100 dark:hover:text-neutral-100 dark:text-neutral-900",
];

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => {
  const colorRandom = colors[Math.floor(Math.random() * colors.length)];

  return (
    <button
      className={classnames(
        "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group",
        colorRandom,
      )}
      onClick={onClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-white bg-black rounded-md group-hover:bg-opacity-0">
        {title}
      </span>
    </button>
  );
};

const CategoriesNavigation: React.FC<Props> = ({ categories }) => {
  const categoriesNoRepeat = categories.filter((category, i) => categories.indexOf(category) === i);

  const { handleSubmit } = useSearchCategory();
  return (
    <section className="mt-6 flex flex-wrap gap-4">
      <Button title="Todos" onClick={() => handleSubmit("")} />
      {categoriesNoRepeat.map((category, i) => (
        <Button key={i} title={category} onClick={() => handleSubmit(category.toLowerCase())} />
      ))}
    </section>
  );
};

export default CategoriesNavigation;
