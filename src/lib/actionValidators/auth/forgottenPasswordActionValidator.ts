import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { ForgottenPasswordFormErrorType } from "@/lib/validations/schemas/shared/forgottenPassword/forgottenPasswordValidationSchema";
import { validateForgottenPasswordFormAsync } from "@/lib/validations/validations/shared/forgottenPassword/validateForgottenPasswordForm";

export default async function forgottenPasswordActionValidator(
  formData: FormData
): Promise<ValidationResultType<ForgottenPasswordFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateForgottenPasswordFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    errors: {},
  } as ValidationResultType<ForgottenPasswordFormErrorType>;
}
