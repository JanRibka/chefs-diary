"use client";

import { Spinner as SpinnerHero, SpinnerProps } from "@heroui/react";

type Props = SpinnerProps & {};

export default function Spinner({
  "aria-label": ariaLabel,
  color,
  classNames,
  ...restProps
}: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SpinnerHero
        aria-label={ariaLabel ?? "Načítání..."}
        color={color ?? "primary"}
        classNames={{
          circle1: "w-28 h-28",
          circle2: "w-28 h-28",
          wrapper: "w-28 h-28",
          ...classNames,
        }}
        {...restProps}
      />
    </div>
  );
}
