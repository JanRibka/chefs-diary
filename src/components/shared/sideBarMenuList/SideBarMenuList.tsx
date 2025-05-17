import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

import sideBarMenuListVariants from "./sideBarMenuListVariants";

type Props = HTMLAttributes<HTMLUListElement> & {
  opened: boolean;
  bypassMdHidden: boolean;
};

export default function SideBarMenuList({
  className,
  children,
  opened,
  bypassMdHidden,
  ...restProps
}: Props) {
  return (
    <ul
      className={mergeStyles(
        className,
        sideBarMenuListVariants({ opened, bypassMdHidden })
      )}
      {...restProps}
    >
      {children}
    </ul>
  );
}
