"use client";

import { mergeStyles } from "@/lib/utils/styles";
import { Button as HeroButton, ButtonProps } from "@heroui/react";

type Props = ButtonProps & {};

export default function Button({ children, className, ...restProps }: Props) {
  return (
    <HeroButton
      className={mergeStyles(
        "font-semibold tracking-tight leading-7 text-sm uppercase",
        className
      )}
      {...restProps}
    >
      {children}
    </HeroButton>
  );
}
