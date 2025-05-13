import { tv } from "tailwind-variants";

export const accordionItemLabelVariants = tv({
  base: "ml-3 md:hidden",
  variants: {
    sideBarOpened: {
      true: "xl:block",
      false: "xl:hidden",
    },
  },
  defaultVariants: { sideBarOpened: false },
});
