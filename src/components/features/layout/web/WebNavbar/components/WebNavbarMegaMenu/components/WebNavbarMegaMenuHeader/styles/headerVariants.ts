import { tv } from "tailwind-variants";

/**
 * Header variants for mega menu
 * Handles title styling with gradient text and description
 */
export const headerVariants = tv({
  slots: {
    container:
      "px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50",
    title: [
      "text-2xl font-bold",
      "bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400",
      "bg-clip-text text-transparent",
    ],
    description: "text-sm text-slate-600 dark:text-slate-400 mt-2",
  },
});

export type HeaderVariants = typeof headerVariants;
