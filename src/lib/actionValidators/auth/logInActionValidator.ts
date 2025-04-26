import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { LogInFormErrorType } from "@/lib/validations/schemas/web/logIn/logInSchema";
import { validateLogInFormAsync } from "@/lib/validations/validations/web/logIn/validateLogInForm";

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
    errors: {},
  } as ValidationResultType<LogInFormErrorType>;
}
