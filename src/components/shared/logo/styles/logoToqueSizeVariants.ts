import { tv } from "tailwind-variants";

export const logoToqueSizeVariants = tv({
  base: "text-white absolute -top-1 -right-1 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1",
  variants: {
    size: {
      sm: "w-4 h-4 lg:w-5 lg:h-5",
      md: "w-5 h-5 lg:w-6 lg:h-6",
      lg: "w-6 h-6 lg:w-7 lg:h-7",
      xl: "w-8 h-8 lg:w-9 lg:h-9",
    },
    scrolled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    { size: "sm", scrolled: true, class: "w-3 h-3 lg:w-4 lg:h-4" },
    { size: "md", scrolled: true, class: "w-4 h-4 lg:w-5 lg:h-5" },
    { size: "lg", scrolled: true, class: "w-5 h-5 lg:w-6 lg:h-6" },
    { size: "xl", scrolled: true, class: "w-7 h-7 lg:w-8 lg:h-8" },
  ],
  defaultVariants: {
    size: "md",
    scrolled: false,
  },
});
