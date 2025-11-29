import { tv } from 'tailwind-variants';

/**
 * mobileMenuStyles - Mobile menu styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const mobileMenuStyles = tv({
  slots: {
    // Main container with animations
    container:
      "lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl bg-background/98 border-b border-border/50 shadow-2xl overflow-hidden transition-all duration-500 ease-out transform-gpu",

    // Background gradient
    backgroundGradient:
      "absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 dark:from-primary/20 dark:via-primary/15 dark:to-primary/10",

    // Animated background element
    animatedBackground:
      "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-primary/20 dark:from-primary/20 dark:to-primary/10 rounded-full blur-2xl animate-pulse",

    // Content wrapper
    content: "relative z-10 px-6 py-8 space-y-6",

    // Auth section with border
    authSection:
      "space-y-4 pt-6 border-t border-gradient-to-r from-primary/30 to-primary/40 dark:from-primary/40 dark:to-primary/50",

    // Bottom wave decoration
    bottomWave:
      "absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-dark to-primary-light opacity-60",
  },
  variants: {
    mobileOpen: {
      true: {
        container: "opacity-100 translate-y-0 scale-100",
      },
      false: {
        container: "opacity-0 -translate-y-8 scale-95 pointer-events-none",
      },
    },
  },
});
