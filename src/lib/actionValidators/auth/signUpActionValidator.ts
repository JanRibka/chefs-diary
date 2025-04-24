import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { SignUpFormErrorType } from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateSignUpFormAsync } from "@/lib/validations/validations/web/signUp/validateSignUpForm";

export default async function signUpActionValidator(
  formData: FormData
): Promise<ValidationResultType<SignUpFormErrorType>> {
  const data = Object.fromEntries(formData);
  debugger;
  const validationResult = await validateSignUpFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  try {
  } catch (error) {
    console.error("Sign up user error:", error);
    // TODO: Hl83ka bude z error library
    return {
      success: false,
      errors: {
        general: "Došlo k chybě při ověřování údajů",
      },
    };
  }

  return { success: true, errors: {} };
}
