import { useCallback, useState } from "react";
import * as Yup from "yup";

import { Input, InputProps } from "@heroui/react";

type Props<T extends object> = InputProps & {
  fieldValidationSchema: Yup.ObjectSchema<T>;
};

export default function ValidateInput<T extends object>({
  value,
  isInvalid,
  errorMessage,
  name,
  onChange,
  fieldValidationSchema,
  ...restProps
}: Props<T>) {
  const [fieldValue, setFieldValue] = useState<string | undefined>(value);

  const getErrorMessage = useCallback(() => {
    debugger;
    //TODO: Ve validac9ch ud2lat asunchronni metodu pro validaci jedne polozyky z modelu
    try {
      fieldValidationSchema.validateSync(
        { [name as string]: fieldValue },
        { abortEarly: false }
      );
    } catch (error) {
      console.error("Validation error:", error);
      debugger;
    }

    return "";
  }, [fieldValue]);

  const fieldErrorMessage = errorMessage ?? getErrorMessage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    onChange?.(event);
  };

  return (
    <Input
      value={value}
      isInvalid={isInvalid || !!!fieldErrorMessage}
      errorMessage={errorMessage ?? fieldErrorMessage}
      onChange={handleChange}
      {...restProps}
    />
  );
}
