import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { EditUnitGroupFormErrorType } from "@/lib/validations/schemas/admin/editUnitGroupFormValidationSchema";
import { validateEditUnitGroupFormAsync } from "@/lib/validations/validations/admin/validateEditUnitGroupForm";

export default async function editUnitGroupActionValidator(
  formData: FormData
): Promise<ValidationResultType<EditUnitGroupFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateEditUnitGroupFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<EditUnitGroupFormErrorType>;
}
