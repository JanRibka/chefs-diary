import { tv } from 'tailwind-variants';

/**
 * searchModalStyles - Search modal styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const searchModalStyles = tv({
  slots: {
    // Modal wrapper
    modal: "",

    // Modal content
    modalContent: "",

    // Modal body
    modalBody: "py-8",

    // Main content container
    content: "space-y-6",

    // Header section
    header: "text-center",

    // Title
    title:
      "text-2xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary-light bg-clip-text text-transparent mb-2",

    // Subtitle
    subtitle: "text-default-600",

    // Search icon
    searchIcon: "w-5 h-5 text-default-400",

    // Tags container
    tagsContainer: "flex flex-wrap gap-2",

    // Tag button
    tagButton:
      "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light hover:bg-primary/15 dark:hover:bg-primary/25 transition-colors",

    // Modal classNames (for HeroUI API)
    modalBackdrop: "bg-black/50",
    modalWrapper: "pt-20",
    modalBase:
      "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800/40",

    // Input classNames (for HeroUI API)
    inputInput: "text-lg",
    inputWrapper:
      "bg-default-100 hover:bg-default-200 border-2 border-transparent focus-within:border-primary transition-all duration-200 shadow-lg",
  },
});
