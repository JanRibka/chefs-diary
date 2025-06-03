import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import unitGroupFormValidationSchema, {
  UnitGroupFormErrorType,
} from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";

type ErrorType = Omit<UnitGroupFormErrorType, "timestamp" | "general">;

export const validateUnitGroupForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    unitGroupFormValidationSchema.validateSync(formData, {
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

export const validateUnitGroupFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    await unitGroupFormValidationSchema.validate(formData, {
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
