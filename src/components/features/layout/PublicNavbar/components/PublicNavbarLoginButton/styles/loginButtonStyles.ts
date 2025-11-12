import { tv } from 'tailwind-variants';

/**
 * loginButtonStyles - Login button styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const loginButtonStyles = tv({
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
  },
});
