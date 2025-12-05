import { tv } from "tailwind-variants";

/**
 * Footer variants for mega menu
 * Handles footer container and link styling with gradient backgrounds
 */
export const footerVariants = tv({
  slots: {
    container: [
      "px-8 py-5 border-t",
      "border-slate-200/50 dark:border-slate-700/50",
      "bg-gradient-to-br from-slate-50/50 to-amber-50/30 dark:from-slate-800/50 dark:to-amber-900/10",
    ],
    link: "group inline-flex items-center gap-2 text-base font-semibold text-amber-600 dark:text-amber-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors",
    arrow: "w-5 h-5 transform group-hover:translate-x-1 transition-transform",
  },
});

export type FooterVariants = typeof footerVariants;
