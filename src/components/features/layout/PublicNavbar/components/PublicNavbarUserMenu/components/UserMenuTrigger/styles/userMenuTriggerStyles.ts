import { tv } from 'tailwind-variants';

/**
 * userMenuTriggerStyles - User menu trigger styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const userMenuTriggerStyles = tv({
  slots: {
    // Main container
    container:
      "flex items-center gap-3 cursor-pointer transition-all duration-300 group-hover:scale-105 px-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30",

    // Avatar container
    avatarContainer: "relative",

    // Avatar
    avatar:
      "ring-3 ring-primary/30 dark:ring-primary/50 hover:ring-primary/50 dark:hover:ring-primary/70 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/60 dark:group-hover:ring-primary/80",

    // Online indicator
    onlineIndicator:
      "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse",

    // Glow effect
    glowEffect:
      "absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150",

    // User info container
    userInfo: "hidden md:block",

    // User name
    userName:
      "text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200",

    // User level
    userLevel: "text-xs text-slate-500 dark:text-slate-400",

    // Settings icon container
    settingsIconContainer:
      "transform group-hover:rotate-180 transition-transform duration-300",

    // Settings icon
    settingsIcon: "w-4 h-4 text-slate-400 dark:text-slate-500",
  },
});
