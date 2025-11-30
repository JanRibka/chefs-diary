import { tv } from "tailwind-variants";

export const logoColorVariants = tv({
  base: "bg-gradient-to-br shadow-xl transition-all duration-500 flex items-center justify-center animate-float",
  variants: {
    variant: {
      default:
        "from-orange-500 via-red-500 to-pink-600 shadow-orange-500/25 rounded-2xl",
      light:
        "from-orange-400 via-red-400 to-pink-500 shadow-orange-400/25 rounded-2xl",
      dark: "from-orange-600 via-red-600 to-pink-700 shadow-orange-600/25 rounded-2xl",
    },
    size: {
      sm: "w-10 h-10 lg:w-12 lg:h-12",
      md: "w-12 h-12 lg:w-14 lg:h-14",
      lg: "w-14 h-14 lg:w-16 lg:h-16",
      xl: "w-18 h-18 lg:w-20 lg:h-20",
    },
    scrolled: {
      true: {},
      false: {},
    },
    disableHover: {
      true: "",
      false: "transform group-hover:scale-105 group-hover:rotate-3",
    },
  },
  compoundVariants: [
    { size: "sm", scrolled: true, class: "w-8 h-8 lg:w-10 lg:h-10" },
    { size: "md", scrolled: true, class: "w-10 h-10 lg:w-12 lg:h-12" },
    { size: "lg", scrolled: true, class: "w-12 h-12 lg:w-14 lg:h-14" },
    { size: "xl", scrolled: true, class: "w-16 h-16 lg:w-18 lg:h-18" },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    scrolled: false,
    disableHover: false,
  },
});
