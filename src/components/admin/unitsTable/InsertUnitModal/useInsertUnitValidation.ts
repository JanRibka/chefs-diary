import { useState } from "react";

import { InsertUnitFormErrorType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
import { validateInsertUnitForm } from "@/lib/validations/validations/admin/validateInsertUnitForm";

export default function useInsertUnitValidation() {
  const [error, setError] = useState<InsertUnitFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateInsertUnitForm(data);

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
