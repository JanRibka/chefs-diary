import { ValidationError } from "yup";

import signUpFormValidationSchema from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

export const validateSignUpForm = <T>(
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: { [K in keyof T]?: string } = {};

  try {
    signUpFormValidationSchema.validateSync(formData, {
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

export const validateSignUpFormAsync = async <T>(
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: { [K in keyof T]?: string } = {};

  try {
    await signUpFormValidationSchema.validate(formData, {
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
