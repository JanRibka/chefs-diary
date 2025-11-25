import { tv } from 'tailwind-variants';

/**
 * desktopNavStyles - Desktop navigation styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const desktopNavStyles = tv({
  slots: {
    // Main navigation container
    nav: "hidden lg:flex items-center",

    // Navigation list
    navList: "flex items-center space-x-2",

    // Navigation item container
    navItem: "relative group",

    // Navigation link
    navLink:
      "relative px-8 py-4 text-sm font-semibold text-muted-foreground transition-all duration-300 rounded-2xl overflow-hidden group-hover:text-primary-foreground",

    // Background hover effect
    backgroundHover:
      "absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left",

    // Shimmer effect
    shimmerEffect:
      "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700",

    // Glow effect
    glowEffect:
      "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-primary/20 blur-xl transform scale-150",

    // Content container
    content:
      "relative flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-200",

    // Icon
    icon: "text-lg group-hover:animate-bounce",

    // Label text
    label: "font-medium tracking-wide",

    // Bottom indicator
    bottomIndicator:
      "absolute bottom-0 left-1/2 w-0 h-1 bg-primary-foreground group-hover:w-full transition-all duration-300 transform -translate-x-1/2 rounded-full",

    // Tooltip container
    tooltip:
      "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none backdrop-blur-sm shadow-xl border border-border",

    // Tooltip content
    tooltipContent: "flex items-center gap-2",

    // Tooltip arrow
    tooltipArrow:
      "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-l border-t border-border",
  },
});
