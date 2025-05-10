import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";
import { tv } from "@heroui/theme";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  lineNumber: 1 | 2 | 3;
  opened: boolean;
};

const lineVariants = tv({
  variants: {
    opened: {
      true: "",
      false: "",
    },
    lineNumber: {
      1: "w-[1.875rem]",
      2: "w-[1.75rem]",
      3: "w-[1.3rem]",
    },
  },
  compoundVariants: [
    // Line 1
    {
      lineNumber: 1,
      opened: true,
      className: "rotate-[45deg] translate-y-[7px]",
    },
    {
      lineNumber: 1,
      opened: false,
      className: "rotate-0 translate-y-0",
    },
    // Line 2
    {
      lineNumber: 2,
      opened: true,
      className: "translate-x-[50px] opacity-0",
    },
    {
      lineNumber: 2,
      opened: false,
      className: "translate-x-0 opacity-100",
    },
    // Line 3
    {
      lineNumber: 3,
      opened: true,
      className: "w-[30px] rotate-[-45deg] translate-y-[-7px]",
    },
    {
      lineNumber: 3,
      opened: false,
      className: "rotate-0 translate-y-0",
    },
  ],
});

export default function HamburgerIconLine({
  className,
  lineNumber,
  opened,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles(
        "p-0 h-[2px] mx-0 my-[5px] bg-primary transition-all duration-700 cubic-bezier(0.9, 0, 0.33, 1)",
        className,
        lineVariants({ opened, lineNumber })
      )}
      {...restProps}
    />
  );
}
