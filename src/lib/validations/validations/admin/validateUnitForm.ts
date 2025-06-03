import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import unitFormValidationSchema, {
  UnitFormErrorType,
} from "@/lib/validations/schemas/admin/unitFormValidationSchema";

type ErrorType = Omit<UnitFormErrorType, "timestamp" | "general">;

export const validateUnitForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    unitFormValidationSchema.validateSync(formData, {
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

export const validateUnitFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    await unitFormValidationSchema.validate(formData, {
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
