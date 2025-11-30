import { tv } from "tailwind-variants";

export const logoContainerVariants = tv({
  base: "flex items-center gap-3 group",
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
