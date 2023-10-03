"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "../lib/utils";
import dynamic from "next/dynamic";

const ButtonCategory = dynamic(() => import("./ButtonCategory"), {
  ssr: false,
});

interface Props {
  categories: [string];
}

const CategoriesNavigation: React.FC<Props> = ({ categories }) => {
  const categoriesNoRepeat = categories.filter((category, i) => categories.indexOf(category) === i);
  const router = useRouter();
  const params = useSearchParams();
  const isCategory = params.get("category");

  const handleSubmit = (value: string) => {
    const newSearchParams = new URLSearchParams(params.toString());

    if (value) {
      newSearchParams.set("category", value);
    } else {
      newSearchParams.delete("category");
    }

    router.push(createUrl("/", newSearchParams));
  };

  return (
    <section className="mt-6 flex flex-wrap gap-4">
      {isCategory && <ButtonCategory title="Todos" onClick={() => handleSubmit("")} />}
      {categoriesNoRepeat.map((category, i) => (
        <ButtonCategory
          key={i}
          title={category}
          onClick={() => handleSubmit(category.toLowerCase())}
        />
      ))}
    </section>
  );
};

export default CategoriesNavigation;
