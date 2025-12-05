import { tv } from "tailwind-variants";

/**
 * mobileNavLinksStyles - Mobile navigation styling with expandable categories
 * Matches desktop design with underline animations
 */
export const mobileNavLinksStyles = tv({
  slots: {
    // Navigation container
    nav: "w-full",
    navList: "flex flex-col gap-1 py-2",
    navItem: "w-full",

    // Regular nav link (no subitems)
    navLink:
      "flex items-center w-full px-4 py-3 min-h-[44px] text-base font-medium transition-colors duration-300 rounded-lg hover:bg-accent",

    label: "relative inline-block",

    // Underline animation (matches desktop)
    underline:
      "absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left transition-transform duration-300",

    // Expandable trigger (for items with subitems)
    expandTrigger:
      "flex items-center justify-between w-full px-4 py-3 min-h-[44px] text-base font-medium transition-colors duration-300 rounded-lg hover:bg-accent text-slate-700 dark:text-slate-300",

    chevron: "w-5 h-5 transition-transform duration-300 text-slate-400",

    // Subitems list wrapper for animation
    subitemsWrapper: "grid transition-all duration-300 ease-in-out",
    subitemsInner: "overflow-hidden",

    // Subitems list
    subitemsList: "flex flex-col gap-1 pl-4",
    subitemLink:
      "flex items-center w-full px-4 py-2.5 min-h-[44px] text-sm transition-colors duration-300 rounded-lg hover:bg-accent/50",
    subitemLabel: "relative inline-block",
    subitemUnderline:
      "absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transform origin-left transition-transform duration-300",
  },
  variants: {
    active: {
      true: {},
      false: {},
    },
    expanded: {
      true: {
        subitemsWrapper: "grid-rows-[1fr] opacity-100",
      },
      false: {
        subitemsWrapper: "grid-rows-[0fr] opacity-0",
      },
    },
  },
  compoundSlots: [
    {
      slots: ["navLink"],
      active: true,
      class: "text-amber-600 dark:text-amber-400",
    },
    {
      slots: ["navLink"],
      active: false,
      class: "text-slate-700 dark:text-slate-300",
    },
    {
      slots: ["underline"],
      active: true,
      class: "scale-x-100",
    },
    {
      slots: ["underline"],
      active: false,
      class: "scale-x-0",
    },
    {
      slots: ["subitemLink"],
      active: true,
      class: "text-amber-600 dark:text-amber-400",
    },
    {
      slots: ["subitemLink"],
      active: false,
      class: "text-slate-600 dark:text-slate-400",
    },
    {
      slots: ["subitemUnderline"],
      active: true,
      class: "scale-x-100",
    },
    {
      slots: ["subitemUnderline"],
      active: false,
      class: "scale-x-0",
    },
    {
      slots: ["chevron"],
      expanded: true,
      class: "rotate-180",
    },
    {
      slots: ["chevron"],
      expanded: false,
      class: "rotate-0",
    },
  ],
});
