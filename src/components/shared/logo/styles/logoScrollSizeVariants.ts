import { tv } from "tailwind-variants";

export const logoScrollSizeVariants = tv({
  base: "text-white drop-shadow-lg transition-transform duration-700 group-hover:rotate-12",
  variants: {
    size: {
      sm: "w-5 h-5 lg:w-6 lg:h-6",
      md: "w-6 h-6 lg:w-7 lg:h-7",
      lg: "w-7 h-7 lg:w-8 lg:h-8",
      xl: "w-9 h-9 lg:w-10 lg:h-10",
    },
    scrolled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    { size: "sm", scrolled: true, class: "w-4 h-4 lg:w-5 lg:h-5" },
    { size: "md", scrolled: true, class: "w-5 h-5 lg:w-6 lg:h-6" },
    { size: "lg", scrolled: true, class: "w-6 h-6 lg:w-7 lg:h-7" },
    { size: "xl", scrolled: true, class: "w-8 h-8 lg:w-9 lg:h-9" },
  ],
  defaultVariants: {
    size: "md",
    scrolled: false,
  },
});
