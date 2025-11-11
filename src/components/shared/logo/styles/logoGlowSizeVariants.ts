import { tv } from "tailwind-variants";

export const logoGlowSizeVariants = tv({
  base: "absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl opacity-30 transition-opacity duration-500 -z-10",
  variants: {
    variant: {
      default: "from-orange-500 to-red-500",
      light: "from-orange-400 to-red-400",
      dark: "from-orange-600 to-red-600",
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
      false: "group-hover:opacity-50",
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
