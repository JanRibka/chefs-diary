import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import {
  getUserByEmail,
  getUserByUserName,
} from "@/lib/repositories/userRepository";
import logger from "@/lib/services/loggerService";
import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { SignUpFormErrorType } from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateSignUpFormAsync } from "@/lib/validations/validations/web/signUp/validateSignUpForm";

export default async function signUpActionValidator(
  formData: FormData
): Promise<ValidationResultType<SignUpFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateSignUpFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  const result: ValidationResultType<SignUpFormErrorType> = {
    success: true,
    errors: {},
  };

  try {
    const email = data.email as string;
    const userName = data.userName as string;

    let user = await getUserByUserName(userName);

    if (user) {
      result.success = false;
      result.errors.userName = getErrorTextByKey("userNameExists");
      result.errors.timestamp = new Date().getTime().toString();
    }

    user = await getUserByEmail(email);

    if (user) {
      result.success = false;
      result.errors.email = getErrorTextByKey("emailExists");
      result.errors.timestamp = !!result.errors.timestamp
        ? result.errors.timestamp
        : new Date().getTime().toString();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    return {
      success: false,
      errors: {
        general: getErrorTextByKey("registerUserMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }

  return result;
}
