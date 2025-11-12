import { tv } from 'tailwind-variants';

/**
 * userMenuItemsStyles - User menu items styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userMenuItemsStyles = tv({
  slots: {
    // Recipes item
    recipesItem:
      "py-3 px-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200",

    // Recipes icon container
    recipesIcon:
      "w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center",

    // Recipes icon emoji
    recipesIconEmoji: "text-white text-sm",

    // Recipes content
    recipesContent: "",

    // Recipes title
    recipesTitle: "font-semibold text-slate-900 dark:text-white",

    // Recipes description
    recipesDescription: "text-xs text-slate-500 dark:text-slate-400",

    // Favorites item
    favoritesItem:
      "py-3 px-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200",

    // Favorites icon container
    favoritesIcon:
      "w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center",

    // Favorites icon emoji
    favoritesIconEmoji: "text-white text-sm",

    // Favorites content
    favoritesContent: "",

    // Favorites title
    favoritesTitle: "font-semibold text-slate-900 dark:text-white",

    // Favorites description
    favoritesDescription: "text-xs text-slate-500 dark:text-slate-400",

    // Settings item
    settingsItem:
      "py-3 px-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200",

    // Settings icon container
    settingsIcon:
      "w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center",

    // Settings icon
    settingsIconSvg: "w-4 h-4 text-white",

    // Settings content
    settingsContent: "",

    // Settings title
    settingsTitle: "font-semibold text-slate-900 dark:text-white",

    // Settings description
    settingsDescription: "text-xs text-slate-500 dark:text-slate-400",
  },
});
