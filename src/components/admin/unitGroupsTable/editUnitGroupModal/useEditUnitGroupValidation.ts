import { useState } from "react";

import { EditUnitGroupFormErrorType } from "@/lib/validations/schemas/admin/editUnitGroupFormValidationSchema";
import { validateEditUnitGroupForm } from "@/lib/validations/validations/admin/validateEditUnitGroupForm";

export default function useEditUnitGroupValidation() {
  const [error, setError] = useState<EditUnitGroupFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateEditUnitGroupForm(data);

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
