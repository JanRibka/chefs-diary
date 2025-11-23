import { tv } from "tailwind-variants";

/**
 * userButtonTriggerStyles - User button trigger styling with tailwind-variants
 * Clean and simple styling for user button
 */
export const loginButtonTriggerStyles = tv({
  slots: {
    // Main button
    button:
      "hidden sm:flex font-black px-6 py-4 rounded-3xl bg-transparent transition-all duration-300 overflow-hidden relative group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  },
  variants: {
    resolvedTheme: {
      dark: {
        button:
          "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white shadow-2xl shadow-purple-500/60 hover:shadow-purple-400/80",
      },
      light: {
        button:
          "bg-transparent hover:bg-transparent text-white shadow-2xl shadow-primary/60 hover:shadow-primary/80",
      },
    },
  },
  defaultVariants: {
    resolvedTheme: "light",
  },
});
