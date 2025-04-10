import { FormHTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = FormHTMLAttributes<HTMLFormElement> & {};

export default function Form({
  action,
  children,
  className,
  ...restProps
}: Props) {
  return (
    <form
      className={mergeStyles("w-full", className)}
      action={action}
      {...restProps}
    >
      {children}
    </form>
  );
}
