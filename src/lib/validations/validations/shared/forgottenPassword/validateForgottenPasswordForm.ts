import { ValidationError } from 'yup';

import ValidationResultType from '@/lib/types/validation/ValidationResultType';
import forgottenPasswordFormValidationSchema, {
    ForgottenPasswordFormErrorType
} from '@/lib/validations/schemas/shared/forgottenPassword/forgottenPasswordValidationSchema';

type ErrorType = Omit<ForgottenPasswordFormErrorType, "timestamp" | "general">;

export const validateForgottenPasswordForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    forgottenPasswordFormValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};

export const validateForgottenPasswordFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    await forgottenPasswordFormValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};
