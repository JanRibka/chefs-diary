import { tv } from "tailwind-variants";

export const accordionItemButtonVariants = tv({
  base: "flex flex-row items-center w-full text-md xl:text-lg px-2 py-3 rounded-lg transition-all duration-500 hover:text-primary",
  variants: {
    opened: {
      true: "text-primary bg-primary/15 shadow-lg shadow-primary/15 font-bold",
      false: "",
    },
  },
  defaultVariants: { opened: false },
});
