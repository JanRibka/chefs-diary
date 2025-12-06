import { tv } from "tailwind-variants";

/**
 * searchModalStyles - Search modal styling with tailwind-variants
 * Orchestrator specific styles (Layout & Modal shell)
 */
export const searchModalStyles = tv({
  slots: {
    // Modal wrapper
    modal: "",
    modalBackdrop: "bg-black/40 backdrop-blur-md",
    modalWrapper: "pt-20",
    modalBase:
      "bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/20 !rounded-2xl overflow-hidden",
    closeButton:
      "absolute right-4 top-4 z-50 text-default-500 hover:text-default-900 dark:hover:text-default-100 transition-colors",

    // Modal content
    modalContent: "overflow-hidden !rounded-2xl",
    modalBody: "p-0 overflow-hidden",

    // Main grid container
    gridContainer: "grid grid-cols-1 lg:grid-cols-12 min-h-[500px]",

    // Left column (Search)
    leftColumn: "lg:col-span-8 p-8 flex flex-col gap-8 relative z-10",
  },
});
