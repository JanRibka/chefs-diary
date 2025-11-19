import { tv } from 'tailwind-variants';

/**
 * mobileSearchSectionStyles - Mobile search section styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const mobileSearchSectionStyles = tv({
  slots: {
    // Main container (hidden on sm and up)
    container: "sm:hidden",

    // Input container with group
    inputContainer: "relative group",

    // Search icon
    searchIcon: "w-5 h-5 text-primary group-focus-within:animate-pulse",

    // Input styles
    input: "text-base font-medium",

    // Input wrapper styles
    inputWrapper:
      "bg-gradient-to-r from-white to-primary/10 dark:from-slate-800 dark:to-primary/20 border-2 border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 focus-within:border-primary dark:focus-within:border-primary-light transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",

    // Glow effect
    glowEffect:
      "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl",
  },
});
