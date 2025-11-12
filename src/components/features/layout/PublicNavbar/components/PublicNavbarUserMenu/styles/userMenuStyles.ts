import { tv } from 'tailwind-variants';

/**
 * userMenuStyles - User menu dropdown styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userMenuStyles = tv({
  slots: {
    // Dropdown container
    dropdown:
      "min-w-dropdown-user bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-2xl",

    // Dropdown menu
    dropdownMenu: "p-4 rounded-3xl",

    // Dropdown item classes for menu items
    dropdownItemBase: "rounded-2xl transition-all duration-200",

    // Divider dropdown item
    dividerItem: "cursor-default hover:bg-transparent p-0 my-2",

    // Divider line
    divider:
      "h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent",
  },
});
