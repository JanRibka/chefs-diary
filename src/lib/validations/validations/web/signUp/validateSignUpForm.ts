import { ValidationError } from "yup";

import signUpFormValidationSchema, {
  SignUpFormErrorType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

type ErrorType = Omit<SignUpFormErrorType, "timestamp">;

export const validateSignUpForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: ErrorType = {};

  try {
    signUpFormValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};

export const validateSignUpFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: ErrorType = {};

  try {
    await signUpFormValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};
