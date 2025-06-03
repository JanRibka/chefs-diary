import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { UnitFormErrorType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { validateUnitFormAsync } from "@/lib/validations/validations/admin/validateUnitForm";

export default async function unitActionValidator(
  formData: FormData
): Promise<ValidationResultType<UnitFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateUnitFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<UnitFormErrorType>;
}
