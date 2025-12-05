import { tv } from "tailwind-variants";

/**
 * navSharedStyles - Shared navigation styles for Desktop and Mobile
 * Ensures consistent hover effects, colors, and animations across the app.
 */
export const navSharedStyles = tv({
  slots: {
    // Link container
    link: "group relative flex items-center gap-2 transition-colors duration-300 whitespace-nowrap",

    // Label text wrapper (for lift effect)
    label:
      "relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-shadow-sm group-hover:text-amber-600 dark:group-hover:text-amber-400",

    // Underline animation
    underline:
      "absolute left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left transition-transform duration-300",

    // Chevron icon
    chevron: "transition-transform duration-300",
  },
  variants: {
    active: {
      true: {
        link: "text-amber-600 dark:text-amber-400",
        underline: "scale-x-100",
        chevron: "text-amber-600 dark:text-amber-400",
      },
      false: {
        link: "text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400",
        underline: "scale-x-0 group-hover:scale-x-100",
        chevron:
          "text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400",
      },
    },
    // Mobile specific adjustments
    mobile: {
      true: {
        link: "group w-full px-4 py-3 min-h-[44px] text-base rounded-lg hover:text-amber-600 dark:hover:text-amber-400",
        underline: "-bottom-0.5", // Reverted to original position
      },
      false: {
        link: "py-2 text-sm font-medium",
        underline: "-bottom-1", // Desktop positioning
      },
    },
    // Mega menu active state (specific to desktop)
    megaMenuActive: {
      true: {
        chevron: "rotate-180 text-amber-600 dark:text-amber-400",
      },
      false: {
        chevron: "rotate-0",
      },
    },
  },
  defaultVariants: {
    active: false,
    mobile: false,
    megaMenuActive: false,
  },
});
