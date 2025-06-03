import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import resendVerificationEmailValidationSchema, {
  ResendVerificationEmailFormErrorType,
} from "@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema";

type ErrorType = Omit<
  ResendVerificationEmailFormErrorType,
  "timestamp" | "general"
>;

export const validateResendVerificationLinkForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    resendVerificationEmailValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};

export const validateResendVerificationLinkFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    await resendVerificationEmailValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!!!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};
