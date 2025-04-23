import { useEffect, useState } from "react";
import * as Yup from "yup";

import { validateField } from "@/lib/validations/validations/field/validateField";
import { Input, InputProps } from "@heroui/react";

type Props<T extends object> = Omit<
  InputProps,
  "value" | "isInvalid" | "errorMessage"
> & {
  validationSchema: Yup.ObjectSchema<T>;
  errors: Record<string, string>;
};

export default function ValidateInput<T extends object>({
  errors,
  name,
  onChange,
  validationSchema,
  ...restProps
}: Props<T>) {
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  const setErrorMessage = (value: string) => {
    if (!!!value) {
      setLocalErrorMessage("");
      return;
    }

    setLocalErrorMessage(validateField<T>(validationSchema, name!, value));
  };

  useEffect(() => {
    if (typeof errors[name!] === "string") {
      setLocalErrorMessage(errors[name!] as string);
    }
  }, [errors, name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setErrorMessage(value);
    onChange?.(event);
  };

  return (
    <Input
      name={name}
      isInvalid={!!localErrorMessage}
      errorMessage={localErrorMessage}
      onChange={handleChange}
      {...restProps}
    />
  );
}
