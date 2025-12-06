import { tv } from "tailwind-variants";

/**
 * mobileToggleStyles - Mobile toggle button styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const mobileToggleStyles = tv({
  slots: {
    // Main container with responsive visibility
    container: "relative group lg:hidden",

    // Button base styles
    button:
      "relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-accent group-hover:scale-110 group-hover:shadow-lg cursor-pointer p-0 min-w-0 w-12 h-12 flex items-center justify-center",

    // Inner gradient overlay
    innerGradient:
      "absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl",

    // Icon container
    iconContainer: "relative z-10 transition-all duration-300",

    // Energy wave animation
    energyWave:
      "absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500",
  },
});
