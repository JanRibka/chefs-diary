import { tv } from "tailwind-variants";

/**
 * searchModalHeaderStyles
 */
export const searchModalHeaderStyles = tv({
  slots: {
    header: "space-y-2",
    title:
      "text-2xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary dark:from-primary dark:via-primary-light dark:to-primary bg-clip-text text-transparent animate-gradient-x drop-shadow-sm",
    subtitle: "text-default-500 font-medium",
  },
});
