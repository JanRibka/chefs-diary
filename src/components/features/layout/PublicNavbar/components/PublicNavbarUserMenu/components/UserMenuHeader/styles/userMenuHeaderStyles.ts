import { tv } from 'tailwind-variants';

/**
 * userMenuHeaderStyles - User menu header styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userMenuHeaderStyles = tv({
  slots: {
    // Dropdown item container
    dropdownItem: "py-4 px-4 cursor-default hover:bg-transparent",

    // Content container
    content: "flex items-center gap-4",

    // Avatar container
    avatarContainer: "relative",

    // Avatar
    avatar: "ring-2 ring-primary/40 dark:ring-primary/60",

    // Badge container
    badge:
      "absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center",

    // Badge icon
    badgeIcon: "w-3 h-3 text-white",

    // User info container
    userInfo: "flex-1",

    // User name
    userName: "font-bold text-lg text-slate-900 dark:text-white",

    // User status
    userStatus: "text-sm text-slate-600 dark:text-slate-400",

    // Level container
    levelContainer: "flex items-center gap-1 mt-1",

    // Level badge
    levelBadge:
      "text-xs bg-gradient-to-r from-primary to-primary-dark text-white px-2 py-1 rounded-full font-medium",
  },
});
