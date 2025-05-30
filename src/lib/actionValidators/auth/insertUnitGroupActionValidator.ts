import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { InsertUnitGroupFormErrorType } from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";
import { validateInsertUnitGroupFormAsync } from "@/lib/validations/validations/admin/insertUnitGroup/validateInsertUnitGroupForm";

export default async function insertUnitGroupActionValidator(
  formData: FormData
): Promise<ValidationResultType<InsertUnitGroupFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateInsertUnitGroupFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<InsertUnitGroupFormErrorType>;
}
