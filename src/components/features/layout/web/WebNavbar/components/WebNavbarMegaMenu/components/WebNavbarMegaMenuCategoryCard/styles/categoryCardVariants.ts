import { tv } from "tailwind-variants";

/**
 * Category card variants for mega menu
 * Handles card styling with responsive design, gradients, and hover effects
 * All visual variants defined here - no props drilling of style constants
 */
export const categoryCardVariants = tv({
  slots: {
    card: "group relative overflow-hidden rounded-2xl transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1 bg-white dark:bg-slate-800 border-2 border-slate-300/60 dark:border-slate-600/60 hover:border-transparent",
    gradientOverlay:
      "absolute inset-0 opacity-15 group-hover:opacity-90 transition-opacity duration-500",
    textOverlay:
      "absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    patternBg: "absolute inset-0 opacity-5 dark:opacity-10",
    content:
      "relative p-4 flex flex-col h-full min-h-[100px] justify-center items-center text-center",
    iconCircle:
      "w-12 h-12 mb-3 mx-auto rounded-full bg-white dark:bg-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50",
    icon: "drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110",
    title:
      "text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-white transition-colors duration-500 drop-shadow-sm group-hover:drop-shadow-md",
    shimmer:
      "absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12",
  },
  variants: {
    gradient: {
      0: { gradientOverlay: "bg-gradient-to-br from-orange-400 to-red-400" },
      1: { gradientOverlay: "bg-gradient-to-br from-amber-400 to-yellow-400" },
      2: { gradientOverlay: "bg-gradient-to-br from-emerald-400 to-teal-400" },
      3: { gradientOverlay: "bg-gradient-to-br from-blue-400 to-cyan-400" },
      4: { gradientOverlay: "bg-gradient-to-br from-purple-400 to-pink-400" },
      5: { gradientOverlay: "bg-gradient-to-br from-rose-400 to-pink-400" },
      6: { gradientOverlay: "bg-gradient-to-br from-indigo-400 to-purple-400" },
      7: { gradientOverlay: "bg-gradient-to-br from-lime-400 to-green-400" },
      8: { gradientOverlay: "bg-gradient-to-br from-sky-400 to-blue-400" },
      9: {
        gradientOverlay: "bg-gradient-to-br from-fuchsia-400 to-purple-400",
      },
      10: { gradientOverlay: "bg-gradient-to-br from-red-400 to-orange-400" },
      11: { gradientOverlay: "bg-gradient-to-br from-yellow-400 to-amber-400" },
    },
    iconColor: {
      0: { icon: "text-orange-500" },
      1: { icon: "text-amber-500" },
      2: { icon: "text-emerald-500" },
      3: { icon: "text-blue-500" },
      4: { icon: "text-purple-500" },
      5: { icon: "text-rose-500" },
      6: { icon: "text-indigo-500" },
      7: { icon: "text-lime-500" },
      8: { icon: "text-sky-500" },
      9: { icon: "text-fuchsia-500" },
      10: { icon: "text-red-500" },
      11: { icon: "text-yellow-500" },
    },
  },
  defaultVariants: {
    gradient: 0,
    iconColor: 0,
  },
});

export type CategoryCardVariants = typeof categoryCardVariants;
