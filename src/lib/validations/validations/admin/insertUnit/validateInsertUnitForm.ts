import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import insertUnitFormValidationSchema, {
  InsertUnitFormErrorType,
} from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";

type ErrorType = Omit<InsertUnitFormErrorType, "timestamp" | "general">;

export const validateInsertUnitForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, errors: {} };

  try {
    insertUnitFormValidationSchema.validateSync(formData, {
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

export const validateInsertUnitFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, errors: {} };

  try {
    await insertUnitFormValidationSchema.validate(formData, {
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
