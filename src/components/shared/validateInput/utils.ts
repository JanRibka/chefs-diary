import * as Yup from "yup";

import { validateField } from "@/lib/validations/validations/shared/field/validateField";

export const validateInputField = <T extends object>(
  validationSchema: Yup.ObjectSchema<T>,
  fieldName: string,
  value: string
): string => {
  if (!value) return "";
  return validateField<T>(validationSchema, fieldName, value);
};

export const getErrorMessage = (
  errors: Record<string, string>,
  fieldName: string
): string => {
  const error = errors[fieldName];
  return typeof error === "string" ? error : "";
};

export const normalizeValue = (value?: string | null): string => {
  return value ?? "";
};
