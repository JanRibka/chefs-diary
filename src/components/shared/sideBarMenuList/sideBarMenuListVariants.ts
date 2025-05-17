import { tv } from "@heroui/theme";

const sideBarMenuListVariants = tv({
  base: [
    "overflow-hidden",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "relative",
    "z-[1]",
    "py-2",
    "px-0",
    "m-0",
    "list-none",
    "list-image-[initial]",
    "md:hidden xl:block",
  ],
  variants: {
    opened: {
      true: ["max-h-40"],
      false: ["max-h-0", "py-0"],
    },
    bypassMdHidden: {
      true: "md:block",
    },
  },
});

export default sideBarMenuListVariants;
