import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { LogInFormErrorType } from "@/lib/validations/schemas/shared/logIn/logInValidationSchema";
import { validateLogInFormAsync } from "@/lib/validations/validations/shared/logIn/validateLogInForm";

export default async function logInActionValidator(
  formData: FormData
): Promise<ValidationResultType<LogInFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateLogInFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<LogInFormErrorType>;
}
