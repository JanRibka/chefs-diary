import { tv } from "tailwind-variants";

/**
 * Category card variants for mega menu
 * Handles card styling with responsive design, gradients, and hover effects
 * All visual variants defined here - no props drilling of style constants
 */
export const categoryCardVariants = tv({
  slots: {
    card: "group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-default-100/50 dark:hover:bg-default-50/5 border border-transparent hover:border-default-200/50 dark:hover:border-default-700/50",
    iconCircle:
      "relative flex items-center justify-center w-10 h-10 rounded-lg bg-default-100 dark:bg-default-50/10 group-hover:scale-110 transition-transform duration-300",
    icon: "w-5 h-5 transition-colors duration-300",
    content: "flex-1",
    title:
      "text-sm font-medium text-default-700 dark:text-default-200 group-hover:text-primary transition-colors duration-300",
    description: "text-xs text-default-400 dark:text-default-500 line-clamp-1",
    arrow:
      "w-4 h-4 text-default-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100",
  },
  variants: {
    gradient: {
      0: { icon: "text-orange-500" },
      1: { icon: "text-red-500" },
      2: { icon: "text-green-500" },
      3: { icon: "text-blue-500" },
      4: { icon: "text-purple-500" },
      5: { icon: "text-pink-500" },
      6: { icon: "text-yellow-500" },
      7: { icon: "text-teal-500" },
      8: { icon: "text-indigo-500" },
      9: { icon: "text-rose-500" },
      10: { icon: "text-cyan-500" },
      11: { icon: "text-amber-500" },
    },
  },
  defaultVariants: {
    gradient: 0,
    iconColor: 0,
  },
});

export type CategoryCardVariants = typeof categoryCardVariants;
