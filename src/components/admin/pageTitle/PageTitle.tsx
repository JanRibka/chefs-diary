import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function PageTitle({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles(
        "px-[1.875rem] py-[0.9375rem] mb-[1.875rem] mt-0 mx-0 bg-white rounded-lg font-bold",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
