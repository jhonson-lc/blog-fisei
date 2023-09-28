"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const useSearchBlog = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || value === "") return router.push("/");
    router.push(`/?search=${value}`);
  };

  return {
    value,
    handleChange,
    handleSubmit,
  };
};
