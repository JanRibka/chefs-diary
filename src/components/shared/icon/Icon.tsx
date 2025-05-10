import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";
import { tv } from "@heroui/theme";

type Props = HTMLAttributes<HTMLDivElement> & {
  disableScaleOnHover?: boolean;
};

const iconVariants = tv({
  base: [
    "flex",
    "items-center",
    "cursor-pointer",
    "text-primary",
    "transition 300ms ease-in-out",
    "hover:text-primary-dark",
  ],
  variants: {
    disableScaleOnHover: {
      true: "",
      false: "hover:scale-125",
    },
  },
});

export default function Icon({
  className,
  children,
  disableScaleOnHover,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles(className, iconVariants({ disableScaleOnHover }))}
      {...restProps}
    >
      {children}
    </div>
  );
}
