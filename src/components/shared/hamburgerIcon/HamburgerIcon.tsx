import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

import HamburgerIconLine from "./HamburgerIconLine";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  opened: boolean;
  setOpen: (open: boolean) => void;
};

export default function HamburgerIcon({
  className,
  opened,
  setOpen,
  ...restProps
}: Props) {
  const handleClick = () => {
    setOpen(!opened);
  };

  return (
    <div
      className={mergeStyles("cursor-pointer z-10", className)}
      onClick={handleClick}
      {...restProps}
    >
      <HamburgerIconLine opened={opened} lineNumber={1} />
      <HamburgerIconLine opened={opened} lineNumber={2} />
      <HamburgerIconLine opened={opened} lineNumber={3} />
    </div>
  );
}
