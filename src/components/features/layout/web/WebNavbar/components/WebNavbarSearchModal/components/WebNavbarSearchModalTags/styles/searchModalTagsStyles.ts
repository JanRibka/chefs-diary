import { tv } from "tailwind-variants";

/**
 * searchModalTagsStyles
 */
export const searchModalTagsStyles = tv({
  slots: {
    tagsSection: "space-y-4",
    tagsTitle:
      "text-sm font-semibold text-default-400 uppercase tracking-wider",
    tagsContainer: "flex flex-wrap gap-2",
    tagButton:
      "rounded-full px-4 py-2 bg-default-100 hover:bg-primary/10 border border-default-200 hover:border-primary/50 text-default-600 hover:text-primary dark:text-default-300 dark:hover:text-primary-300 transition-all duration-300 hover:scale-105 font-medium",
  },
});
