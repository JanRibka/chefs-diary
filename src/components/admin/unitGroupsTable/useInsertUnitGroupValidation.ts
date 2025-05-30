import { useState } from "react";

import { InsertUnitGroupFormErrorType } from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";
import { validateInsertUnitGroupForm } from "@/lib/validations/validations/admin/insertUnitGroup/validateInsertUnitGroupForm";

export default function useInsertUnitGroupValidation() {
  const [error, setError] = useState<InsertUnitGroupFormErrorType>({});

  const validate = (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const validationResult = validateInsertUnitGroupForm(data);

    if (!validationResult.success) {
      setError({ ...validationResult.error, timestamp: Date.now().toString() });
      return false;
    }

    setError({});
    return true;
  };

  return { error, setError, validate };
}
