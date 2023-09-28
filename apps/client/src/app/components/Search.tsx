"use client";
import React from "react";
import { useSearchBlog } from "../hooks/useSearchBlog";

const Search: React.FC = () => {
  const { handleChange, handleSubmit, value } = useSearchBlog();
  return (
    <form onSubmit={handleSubmit}>
      <label
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        htmlFor="default-search"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <input
          className="block w-full p-4 pl-10 text-sm dark:text-gray-900 border dark:border-gray-300 rounded-lg dark:bg-gray-50 bg-gray-950 border-gray-600 placeholder-gray-400 text-white focus:outline-none"
          id="default-search"
          placeholder="Buscar blogs ..."
          type="search"
          value={value}
          onChange={handleChange}
        />
        <button
          className="dark:text-white absolute right-2.5 bottom-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-800 focus:ring-4 focus:outline-none dark:focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800"
          type="submit"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default Search;
