import { useState } from "react";

import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";
import { validateIngredientForm } from "@/lib/validations/validations/admin/validateIngredientForm";

type UseEditIngredientValidationReturn = {
  error: IngredientFormErrorType;
  setError: (error: IngredientFormErrorType) => void;
  validate: (event: React.FormEvent<HTMLFormElement>) => boolean;
  clearErrors: () => void;
};

/**
 * Hook for client-side validation of edit ingredient forms.
 * Provides self-contained error state management and validation logic.
 *
 * @returns {UseEditIngredientValidationReturn} Validation utilities
 * @returns {IngredientFormErrorType} error - Current validation errors
 * @returns {Function} setError - Manually set validation errors
 * @returns {Function} validate - Validate form data from event and update error state
 * @returns {Function} clearErrors - Clear all validation errors
 */
export default function useEditIngredientValidation(): UseEditIngredientValidationReturn {
  const [error, setError] = useState<IngredientFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateIngredientForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setError({ ...validationResult.error, timestamp: Date.now().toString() });
      return false;
    }

    setError({});
    return true;
  };

  const clearErrors = () => {
    setError({});
  };

  return { error, setError, validate, clearErrors };
}
