import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = HTMLAttributes<HTMLElement> & {};

export default function PageContentSection({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <section
      className={mergeStyles(
        "max-w-full w-full mt-7 mx-7 overflow-hidden",
        className
      )}
      {...restProps}
    >
      {children}
    </section>
  );
}
