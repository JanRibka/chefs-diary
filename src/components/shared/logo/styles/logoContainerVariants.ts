import { tv } from "tailwind-variants";

export const logoContainerVariants = tv({
  base: "flex items-center gap-3",
  variants: {
    disableHover: {
      true: "",
      false: "group",
    },
  },
  defaultVariants: {
    disableHover: false,
  },
});
