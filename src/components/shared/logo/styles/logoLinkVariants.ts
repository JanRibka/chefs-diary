import { tv } from "tailwind-variants";

export const logoLinkVariants = tv({
  base: "",
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
