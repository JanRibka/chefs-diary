import { tv } from 'tailwind-variants';

/**
 * userMenuSignOutStyles - User menu sign out styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userMenuSignOutStyles = tv({
  slots: {
    // Dropdown item
    dropdownItem:
      "py-3 px-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200",

    // Icon container
    iconContainer:
      "w-8 h-8 bg-gradient-to-r from-red-500 to-primary rounded-xl flex items-center justify-center",

    // Icon
    icon: "w-4 h-4 text-white",

    // Form
    form: "w-full",

    // Button
    button: "w-full text-left",

    // Content
    content: "",

    // Title
    title: "font-semibold",

    // Description
    description: "text-xs opacity-75",
  },
});
