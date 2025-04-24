import { useEffect, useState } from "react";
import * as Yup from "yup";

import { mergeStyles } from "@/lib/utils/styles";
import { validateField } from "@/lib/validations/validations/field/validateField";
import { Checkbox, CheckboxProps } from "@heroui/react";

type Props<T extends object> = Omit<
  CheckboxProps,
  "value" | "isInvalid" | "errorMessage"
> & {
  validationSchema: Yup.ObjectSchema<T>;
  errors: Record<string, string>;
};

export default function ValidateCheckbox<T extends object>({
  children,
  className,
  name,
  onValueChange,
  validationSchema,
  errors,
  ...restProps
}: Props<T>) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  const setErrorMessage = (isSelected: boolean) => {
    if (!isSelected) {
      setLocalErrorMessage("");
      return;
    }

    setLocalErrorMessage(validateField<T>(validationSchema, name!, isSelected));
  };

  useEffect(() => {
    if (typeof errors[name!] === "string") {
      setLocalErrorMessage(errors[name!] as string);
    }
  }, [errors, name]);

  const handleValueChange = (isSelected: boolean) => {
    setErrorMessage(isSelected);
    setIsSelected(isSelected);
    onValueChange?.(isSelected);
  };

  return (
    <div className={mergeStyles("flex flex-col gap-1", className)}>
      <Checkbox
        name={name}
        value={isSelected.toString()}
        // isInvalid={isInvalid && !isSelected}
        isInvalid={!!localErrorMessage}
        onValueChange={handleValueChange}
        {...restProps}
      >
        {children}
      </Checkbox>
      {!!localErrorMessage && (
        <p className="text-danger-500 text-tiny">{localErrorMessage}</p>
      )}
    </div>
  );
}
