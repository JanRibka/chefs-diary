import { useState } from "react";

import { mergeStyles } from "@/lib/utils/styles";
import { Checkbox, CheckboxProps } from "@heroui/react";

type Props = Omit<CheckboxProps, "value"> & {
  errorMessage?: string;
};

export default function ValidateCheckbox({
  children,
  isInvalid,
  errorMessage,
  className,
  ...restProps
}: Props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={mergeStyles("flex flex-col gap-1", className)}>
      <Checkbox
        value={isSelected.toString()}
        isInvalid={isInvalid && !isSelected}
        onValueChange={setIsSelected}
        {...restProps}
      >
        {children}
      </Checkbox>
      {isInvalid && !isSelected && !!errorMessage && (
        <p className="text-danger-500 text-tiny">{errorMessage}</p>
      )}
    </div>
  );
}
