import { useState } from "react";

import { UnitFormErrorType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { validateUnitForm } from "@/lib/validations/validations/admin/validateUnitForm";

export default function useInsertUnitValidation() {
  const [error, setError] = useState<UnitFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateUnitForm(data);

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
