import { tv } from "tailwind-variants";

/**
 * searchModalInputStyles
 */
export const searchModalInputStyles = tv({
  slots: {
    inputInput: "text-lg font-medium placeholder:text-default-400",
    inputWrapper:
      "h-16 bg-default-50 hover:bg-default-100 border-2 border-default-200 focus-within:border-primary focus-within:bg-background focus-within:shadow-[0_0_25px_rgba(var(--primary-rgb),0.25)] transition-all duration-300 rounded-2xl group data-[focus=true]:border-primary data-[focus=true]:bg-background !ring-0 !outline-none shadow-none",
    searchIcon:
      "w-6 h-6 text-primary dark:text-primary-light group-focus-within:text-primary-dark transition-colors",
  },
});
