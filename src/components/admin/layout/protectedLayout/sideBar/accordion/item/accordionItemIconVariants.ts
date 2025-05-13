import { tv } from "tailwind-variants";

export const accordionItemIconVariants = tv({
  base: "transition-transform duration-500 md:hidden xl:block",
  variants: {
    opened: {
      true: "",
      false: "",
    },
    sideBarOpened: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { opened: true, sideBarOpened: true, class: "rotate-90" },
    { opened: true, sideBarOpened: false, class: "xl:hidden" },
    { opened: false, sideBarOpened: true, class: "rotate-0" },
    { opened: false, sideBarOpened: false, class: "xl:hidden" },
  ],
  defaultVariants: { opened: false, sideBarOpened: false },
});
