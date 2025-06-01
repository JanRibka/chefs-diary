import { useState } from "react";

import { InsertUnitGroupFormErrorType } from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";
import { validateInsertUnitGroupForm } from "@/lib/validations/validations/admin/validateInsertUnitGroupForm";

export default function useInsertUnitGroupValidation() {
  const [error, setError] = useState<InsertUnitGroupFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateInsertUnitGroupForm(data);

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
