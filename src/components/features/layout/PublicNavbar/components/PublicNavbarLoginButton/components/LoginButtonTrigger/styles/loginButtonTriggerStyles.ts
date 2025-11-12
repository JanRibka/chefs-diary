import { tv } from 'tailwind-variants';

/**
 * loginButtonTriggerStyles - Login button trigger styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const loginButtonTriggerStyles = tv({
  slots: {
    // Main button
    button: "hidden sm:flex font-black px-6 py-4 rounded-3xl border-4 transition-all duration-300 overflow-hidden relative group cursor-pointer",

    // Neon glow layers
    glowLayer1: "absolute inset-0 rounded-3xl blur-lg opacity-60 group-hover:opacity-85 transition-opacity duration-300",
    glowLayer2: "absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300",
  },
  variants: {
    resolvedTheme: {
      dark: {
        button: "border-purple-500 hover:border-purple-400 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white shadow-2xl shadow-purple-500/60 hover:shadow-purple-400/80",
        glowLayer1: "bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400",
        glowLayer2: "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300",
      },
      light: {
        button: "border-primary hover:border-primary-light bg-gradient-to-r from-primary via-primary-dark to-primary-light hover:from-primary-light hover:via-primary hover:to-primary-dark text-white shadow-2xl shadow-primary/60 hover:shadow-primary/80",
        glowLayer1: "bg-gradient-to-r from-primary/40 via-primary/50 to-primary/60",
        glowLayer2: "bg-gradient-to-r from-primary/30 via-primary/40 to-primary/50",
      },
    },
  },
  defaultVariants: {
    resolvedTheme: "light",
  },
});