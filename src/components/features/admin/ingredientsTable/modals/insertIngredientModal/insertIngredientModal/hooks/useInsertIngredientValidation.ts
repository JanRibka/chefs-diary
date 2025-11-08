import { useState } from "react";

import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";
import { validateIngredientForm } from "@/lib/validations/validations/admin/validateIngredientForm";

export default function useInsertIngredientValidation() {
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

  return { error, setError, validate };
}
