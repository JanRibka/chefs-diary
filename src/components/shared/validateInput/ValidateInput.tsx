import { useEffect, useState } from "react";
import * as Yup from "yup";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { validateField } from "@/lib/validations/validations/shared/field/validateField";
import { Input, InputProps } from "@heroui/react";

type Props<T extends object> = Omit<
  InputProps,
  "isInvalid" | "errorMessage"
> & {
  validationSchema: Yup.ObjectSchema<T>;
  errors: Record<string, string>;
};

export default function ValidateInput<T extends object>({
  value,
  errors,
  name,
  onChange,
  validationSchema,
  ...restProps
}: Props<T>) {
  const isFirstRender = useIsFirstRender();

  const [localValue, setLocalValue] = useState<string>(value ?? "");
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

  useEffect(() => {
    if (isFirstRender) return;

    setLocalValue(value ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLocalValue(value);
    setErrorMessage(value);
    onChange?.(event);
  };

  return (
    <Input
      value={localValue}
      name={name}
      isInvalid={!!localErrorMessage}
      errorMessage={localErrorMessage}
      onChange={handleChange}
      {...restProps}
    />
  );
}
