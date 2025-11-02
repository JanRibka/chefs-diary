import { FormHTMLAttributes, forwardRef } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = FormHTMLAttributes<HTMLFormElement> & {};

const Form = forwardRef<HTMLFormElement, Props>(
  ({ action, children, className, ...restProps }, ref) => {
    return (
      <form
        ref={ref}
        className={mergeStyles("w-full", className)}
        action={action}
        {...restProps}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

export default Form;
