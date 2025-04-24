import { ValidationError } from "yup";

import confirmPasswordValidationSchema, {
  ConfirmPasswordFormErrorType,
} from "@/lib/validations/schemas/shared/confirmPassword/confirmPasswordSchema";

export const validateConfirmPassword = (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: ConfirmPasswordFormErrorType = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ConfirmPasswordFormErrorType;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};

export const validateConfirmPasswordAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: ConfirmPasswordFormErrorType = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ConfirmPasswordFormErrorType;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};
