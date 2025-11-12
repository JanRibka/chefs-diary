import { tv } from 'tailwind-variants';

/**
 * mobileNavLinksStyles - Mobile navigation links styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const mobileNavLinksStyles = tv({
  slots: {
    // Navigation container
    nav: "",

    // Navigation list
    navList: "space-y-3",

    // Navigation item
    navItem: "relative group",

    // Navigation link
    navLink:
      "relative block px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 rounded-2xl overflow-hidden transition-all duration-300 group-hover:text-white transform group-hover:scale-105",

    // Animated background (color will be dynamic)
    animatedBackground:
      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left",

    // Ripple effect
    rippleEffect:
      "absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700",

    // Content container
    content: "relative flex items-center gap-4",

    // Icon container
    iconContainer: "relative",

    // Icon
    icon: "text-2xl group-hover:animate-bounce transition-transform duration-200",

    // Icon glow effect
    iconGlow:
      "absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm",

    // Text container
    textContainer: "flex-1",

    // Label text
    label: "block font-bold tracking-wide group-hover:text-shadow-lg",

    // Underline effect
    underline:
      "w-0 group-hover:w-full h-0.5 bg-white/80 transition-all duration-300 mt-1 rounded-full",

    // Arrow container
    arrowContainer:
      "opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0",

    // Arrow icon
    arrow: "w-5 h-5",

    // Side glow effect (color will be dynamic)
    sideGlow:
      "absolute inset-y-0 -left-2 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm",
  },
});
