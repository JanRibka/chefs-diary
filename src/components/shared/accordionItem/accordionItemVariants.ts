import { tv } from '@heroui/theme';

const accordionItemVariants = tv({
  base: [
    "py-0 md:py-0.5 xl:py-0",
    "px-2 md:px-5 xl:px-0",
    "xl:text-center",
    "relative",
    "flex",
    "flex-col",
    "list-none",
    "list-image-[initial]",
  ],
  variants: {
    opened: {
      true: [],
      false: [],
    },
  },
});

export default accordionItemVariants;
