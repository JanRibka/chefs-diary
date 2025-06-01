import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { InsertUnitFormErrorType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
import { validateInsertUnitFormAsync } from "@/lib/validations/validations/admin/validateInsertUnitForm";

export default async function insertUnitActionValidator(
  formData: FormData
): Promise<ValidationResultType<InsertUnitFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateInsertUnitFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<InsertUnitFormErrorType>;
}
