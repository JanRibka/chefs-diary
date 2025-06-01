import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { ResendVerificationEmailFormErrorType } from "@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema";
import { validateResendVerificationLinkFormAsync } from "@/lib/validations/validations/web/resendVerificationLink/validateResendVerificationLinkForm";

export default async function resendVerificationLinkActionValidator(
  formData: FormData
): Promise<ValidationResultType<ResendVerificationEmailFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateResendVerificationLinkFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<ResendVerificationEmailFormErrorType>;
}
