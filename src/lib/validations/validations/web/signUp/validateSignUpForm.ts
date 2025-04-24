import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import signUpFormValidationSchema, {
  SignUpFormErrorType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

type ErrorType = Omit<SignUpFormErrorType, "timestamp" | "general">;

export const validateSignUpForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, errors: {} };

  try {
    signUpFormValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!result.errors[path]) {
        result.errors[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};

export const validateSignUpFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, errors: {} };

  try {
    await signUpFormValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!result.errors[path]) {
        result.errors[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};
