"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const useSearchCategory = () => {
  const router = useRouter();

  const handleSubmit = (value: string) => {
    if (!value || value === "") return router.push("/");
    router.push(`/?category=${value}`);
  };

  return {
    handleSubmit,
  };
};
