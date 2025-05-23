import { tv } from '@heroui/theme';

export const sideBarVariants = tv({
  base: [
    "w-64 md:w-24 xl:w-40 2xl:w-44",
    "bg-white",
    "shadow-md",
    "fixed",
    "top-16",
    "bottom-0",
    "md:left-0",
    "transition-all",
    "duration-200",
    "ease-linear",
    "z-6",
    "shadow-[0_0_0.625rem_rgba(0,0,0,0.2)]",
    "md:shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.02)]",
  ],
  variants: {
    opened: {
      true: "left-0",
      false: "-left-full",
    },
  },
  defaultVariants: { opened: false },
});
