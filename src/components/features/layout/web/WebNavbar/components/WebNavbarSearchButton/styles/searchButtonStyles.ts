import { tv } from 'tailwind-variants';

/**
 * searchButtonStyles - Search button styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const searchButtonStyles = tv({
  slots: {
    // Main container with hover effects
    container: "relative group cursor-pointer",

    // Button base styles
    button:
      "relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-accent group-hover:scale-110 group-hover:shadow-lg",

    // Inner gradient overlay
    innerGradient:
      "absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl",

    // Icon container with rotation
    iconContainer:
      "relative z-10 transition-all duration-500 group-hover:rotate-12",

    // Search icon
    searchIcon:
      "w-6 h-6 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary",

    // Energy wave animation
    energyWave:
      "absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500",

    // Pulse ring effect
    pulseRing:
      "absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none",

    // Glow effect
    glowEffect:
      "absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-primary/50 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-150 pointer-events-none",
  },
});
