import { tv } from 'tailwind-variants';

/**
 * themeToggleStyles - Theme toggle button styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const themeToggleStyles = tv({
  slots: {
    // Main container with hover effects
    container: "relative group cursor-pointer",

    // Button base styles
    button:
      "relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 group-hover:scale-110 group-hover:shadow-lg",

    // Inner gradient overlay
    innerGradient:
      "absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl",

    // Icon container with rotation
    iconContainer:
      "relative z-10 transition-all duration-500 group-hover:rotate-180",

    // Icons
    moonIcon:
      "w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors duration-300",
    sunIcon:
      "w-6 h-6 text-primary group-hover:text-yellow-500 transition-colors duration-300",
    placeholder: "w-6 h-6 inline-block",

    // Energy wave animation
    energyWave:
      "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl",

    // Outer glow effect
    glowEffect:
      "absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/40 to-orange-500/40 dark:from-blue-500/40 dark:to-purple-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-150 pointer-events-none",
  },
});
