import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { UnitGroupFormErrorType } from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";
import { validateUnitGroupFormAsync } from "@/lib/validations/validations/admin/validateUnitGroupForm";

export default async function insertUnitGroupActionValidator(
  formData: FormData
): Promise<ValidationResultType<UnitGroupFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateUnitGroupFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<UnitGroupFormErrorType>;
}
