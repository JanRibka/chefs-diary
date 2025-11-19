import { tv } from "tailwind-variants";

/**
 * userButtonStyles - User button styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userButtonStyles = tv({
  slots: {
    // Main container with group
    container: "relative group",

    // Subtle glow effect
    glowEffect:
      "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-110",
  },
  variants: {
    resolvedTheme: {
      dark: {
        glowEffect: "bg-purple-500/20",
      },
      light: {
        glowEffect: "bg-primary/20",
      },
    },
    isOpen: {
      true: {
        container: "scale-110",
      },
      false: {
        container: "",
      },
    },
  },
});
