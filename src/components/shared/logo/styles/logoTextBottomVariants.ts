import { tv } from "tailwind-variants";

export const logoTextBottomVariants = tv({
  base: "font-extrabold tracking-tight -mt-1 flex items-center gap-2 text-left",
  variants: {
    variant: {
      default: "text-amber-900 dark:text-amber-100",
      light: "text-amber-800 dark:text-amber-200",
      dark: "text-amber-950 dark:text-amber-50",
    },
    size: {
      sm: "text-xl lg:text-2xl",
      md: "text-2xl lg:text-3xl",
      lg: "text-3xl lg:text-4xl",
      xl: "text-4xl lg:text-5xl",
    },
    scrolled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    { size: "sm", scrolled: true, class: "text-lg lg:text-xl" },
    { size: "md", scrolled: true, class: "text-xl lg:text-2xl" },
    { size: "lg", scrolled: true, class: "text-2xl lg:text-3xl" },
    { size: "xl", scrolled: true, class: "text-3xl lg:text-4xl" },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    scrolled: false,
  },
});
