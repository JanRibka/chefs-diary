import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { PasswordResetFormErrorType } from "@/lib/validations/schemas/shared/passwordReset/passwordResetFormValidationSchema";
import { validatePasswordResetFormAsync } from "@/lib/validations/validations/shared/passwordReset/validatePasswordResetForm";

export default async function passwordResetActionValidator(
  formData: FormData
): Promise<ValidationResultType<PasswordResetFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validatePasswordResetFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    errors: {},
  } as ValidationResultType<PasswordResetFormErrorType>;
}
