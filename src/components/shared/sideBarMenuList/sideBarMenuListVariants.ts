import { tv } from '@heroui/theme';

const sideBarMenuListVariants = tv({
  base: [
    "transition-all",
    "duration-200",
    "ease-in-out",
    "relative",
    "z-[1]",
    "py-2",
    "px-0",
    "m-0",
    "list-none",
    "list-image-[initial]",
  ],
  variants: {
    opened: {
      true: [],
      false: ["h-[14px]", "hidden"],
    },
  },
});

export default sideBarMenuListVariants;
