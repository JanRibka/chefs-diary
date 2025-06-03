import { useState } from "react";

import { UnitGroupFormErrorType } from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";
import { validateUnitGroupForm } from "@/lib/validations/validations/admin/validateUnitGroupForm";

export default function useEditUnitGroupValidation() {
  const [error, setError] = useState<UnitGroupFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateUnitGroupForm(data);

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
