import { tv } from "tailwind-variants";

export const accordionItemIconLabelWrapperVariants = tv({
  base: "flex w-full items-center justify-start md:justify-center",
  variants: {
    sideBarOpened: {
      true: "xl:justify-start",
      false: "",
    },
  },

  defaultVariants: { sideBarOpened: false },
});
