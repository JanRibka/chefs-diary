import { tv } from 'tailwind-variants';

export const accordionItemLabelIconVariants = tv({
  base: [
    "text-lg md:text-[1.375rem] xl:text-[1.87rem]",
    "leading-none",
    "inline-block xl:flex",
    "align-middle",
    "relative",
    "top-0",
    "h-auto",
    "w-auto",
    "text-center",
    "mr-4",
    "rounded-sm",
    "duration-0",
    "md:m-0",
    "xl:mx-auto",
    "xl:items-center",
  ],
  variants: {
    sideBarOpened: {
      true: [],
      false: "",
    },
  },
  defaultVariants: { sideBarOpened: false },
});
