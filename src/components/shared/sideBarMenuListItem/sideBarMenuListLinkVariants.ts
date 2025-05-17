import { tv } from 'tailwind-variants';

const sideBarMenuListLinkVariants = tv({
  base: [
    "text-sm",
    "py-2",
    "pr-2",
    "pl-14",
    "transition-all",
    "duration-500",
    "relative",
    "block",
    "outline-0",
    "text-sideBarText",
    "no-underline",
  ],
  variants: {
    active: {
      true: "text-primary",
      false: "",
    },
  },
});

export default sideBarMenuListLinkVariants;
