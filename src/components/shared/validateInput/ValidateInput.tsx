import { useCallback, useState } from "react";
import * as Yup from "yup";

import { validateField } from "@/lib/validations/validations/field/validateField";
import { Input, InputProps } from "@heroui/react";

type Props<T extends object> = InputProps & {
  validationSchema: Yup.ObjectSchema<T>;
};

export default function ValidateInput<T extends object>({
  value,
  isInvalid,
  errorMessage,
  name,
  onChange,
  validationSchema,
  ...restProps
}: Props<T>) {
  const [fieldValue, setFieldValue] = useState<string | undefined>(value);

  const getErrorMessage = useCallback(() => {
    if (!!!fieldValue) {
      return "";
    }

    return validateField<T>(validationSchema, name!, fieldValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  const fieldErrorMessage = errorMessage ?? getErrorMessage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    onChange?.(event);
  };

  return (
    <Input
      value={value}
      isInvalid={isInvalid || !!fieldErrorMessage}
      errorMessage={fieldErrorMessage}
      onChange={handleChange}
      {...restProps}
    />
  );
}
