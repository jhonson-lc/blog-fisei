export const getRandomColor = () => {
  const colors = [
    "bg-gradient-to-br from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 text-neutral-100 dark:text-neutral-900",
    "bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-neutral-100 dark:text-neutral-900",
    "bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-neutral-100 dark:text-neutral-900",
    "bg-gradient-to-br from-pink-500 to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 text-neutral-100 dark:text-neutral-900",
    "bg-gradient-to-br from-teal-300 to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 text-neutral-100 dark:hover:text-neutral-100 dark:text-neutral-900",
    "bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 text-neutral-100 dark:hover:text-neutral-100 dark:text-neutral-900",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
