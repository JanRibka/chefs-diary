import { ValidationError } from "yup";

import confirmPasswordValidationSchema from "@/lib/validations/schemas/shared/confirmPassword/confirmPasswordSchema";

export const validateConfirmPassword = <T extends object>(
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: { [K in keyof T]?: string } = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof T;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};

export const validateConfirmPasswordAsync = async <T extends object>(
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: { [K in keyof T]?: string } = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof T;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};
