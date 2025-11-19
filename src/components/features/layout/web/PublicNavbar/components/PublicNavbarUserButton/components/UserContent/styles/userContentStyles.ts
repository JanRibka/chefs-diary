import { tv } from "tailwind-variants";

/**
 * userMenuTriggerStyles - User menu trigger styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userContentStyles = tv({
  slots: {
    // Main container
    container:
      "flex items-center gap-3 cursor-pointer transition-all duration-300 group-hover:scale-105 px-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30",
  },
});
