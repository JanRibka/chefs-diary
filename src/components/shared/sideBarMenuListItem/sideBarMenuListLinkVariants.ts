import { tv } from '@heroui/theme';

const sideBarMenuListLinkVariants = tv({
  base: [
    "text-sm 2xl:text-base",
    "py-2",
    "pr-2 md:pr-0",
    "pl-14 md:pl-0",
    "md:min-w-24 xl:min-w-0",
    "transition-all",
    "duration-500",
    "relative",
    "block",
    "outline-0",
    "text-sideBarText",
    "no-underline",
    "md:text-center",
  ],
  variants: {
    active: {
      true: ["text-primary", "xl:bg-gradient-to-r from-gray-200 to-gray-900]"],
      false: "",
    },
  },
});

export default sideBarMenuListLinkVariants;
