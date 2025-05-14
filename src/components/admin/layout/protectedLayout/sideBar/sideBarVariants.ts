import { tv } from "tailwind-variants";

export const sideBarVariants = tv({
  base: "w-64 md:w-24 bg-white fixed top-16 bottom-0 md:left-0 transition-all duration-700 cubic-bezier(0.9, 0, 0.33, 1) z-10",
  variants: {
    opened: {
      true: "left-0 xl:left-0 xl:w-64",
      false: "-left-full xl:left-0 xl:w-24",
    },
  },
  defaultVariants: { opened: false },
});
