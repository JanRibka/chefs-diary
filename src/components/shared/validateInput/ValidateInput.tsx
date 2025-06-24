import { forwardRef } from "react";

import { Input } from "@heroui/react";

import { useValidateInput } from "./hooks";

import type { ValidateInputProps } from "./types";
const ValidateInput = <T extends object>(
  {
    value,
    errors,
    name,
    onChange,
    onValueChange,
    validationSchema,
    ...restProps
  }: ValidateInputProps<T>,
  ref?: React.Ref<HTMLInputElement>
) => {
  const {
    localValue,
    localErrorMessage,
    handleChange,
    handleValueChange,
    isInvalid,
  } = useValidateInput({
    initialValue: value,
    name,
    validationSchema,
    errors,
    onChange,
    onValueChange,
  });

  return (
    <Input
      ref={ref}
      value={localValue}
      name={name}
      isInvalid={isInvalid}
      errorMessage={localErrorMessage}
      onChange={handleChange}
      onValueChange={handleValueChange}
      // FIXES: Autocomplete issue - ensure autoComplete is properly passed
      autoComplete={restProps.autoComplete}
      // HTML autocomplete attributes
      autoCorrect={restProps.autoCorrect}
      autoCapitalize={restProps.autoCapitalize}
      {...restProps}
    />
  );
};

// Generic forwardRef wrapper to maintain type safety
const ValidateInputWithRef = forwardRef(ValidateInput) as <T extends object>(
  props: ValidateInputProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

export default ValidateInputWithRef;
