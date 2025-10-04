import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";
import { validateIngredientFormAsync } from "@/lib/validations/validations/admin/validateIngredientForm";

export default async function ingredientActionValidator(
  formData: FormData
): Promise<ValidationResultType<IngredientFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateIngredientFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<IngredientFormErrorType>;
}
