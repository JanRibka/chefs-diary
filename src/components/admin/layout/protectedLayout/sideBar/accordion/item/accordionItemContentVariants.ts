import { tv } from "tailwind-variants";

export const accordionItemContentVariants = tv({
  base: "overflow-hidden transition-all duration-500 ease-in-out pl-6 md:hidden",
  variants: {
    opened: {
      true: "max-h-40 py-2",
      false: "max-h-0 py-0",
    },
    sideBarOpened: {
      true: "xl:block",
      false: "",
    },
  },
  defaultVariants: { opened: false, sideBarOpened: false },
});
