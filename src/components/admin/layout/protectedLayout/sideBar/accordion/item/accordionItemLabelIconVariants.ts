import { tv } from "tailwind-variants";

export const accordionItemLabelIconVariants = tv({
  base: "text-xl md:text-3xl",
  variants: {
    sideBarOpened: {
      true: "xl:text-2xl",
      false: "xl:text-3xl",
    },
  },
  defaultVariants: { sideBarOpened: false },
});
