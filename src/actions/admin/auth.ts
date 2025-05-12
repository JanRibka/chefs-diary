"use server";

import { signIn, signOut } from "@/config/auth/authAdmin";
import logInActionValidator from "@/lib/actionValidators/auth/logInActionValidator";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import AuthError from "@/lib/errors/AuthError";
import logger from "@/lib/services/loggerService";
import FormActionState from "@/lib/types/actions/FormActionState";
import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import {
  LogInFormErrorType,
  LogInFormType,
} from "@/lib/validations/schemas/shared/logIn/logInValidationSchema";

/**
 * Login action
 * @param _prev
 * @param formData
 * @returns
 */
export const logInAction = async (
  _prev: FormActionState<LogInStatusEnum, LogInFormType, LogInFormErrorType>,
  formData: FormData
): Promise<
  FormActionState<LogInStatusEnum, LogInFormType, LogInFormErrorType>
> => {
  const validationResult = await logInActionValidator(formData);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const persistLogin = JSON.parse(formData.get("persistLogin") as string);

  const form: LogInFormType = {
    email,
    password,
    persistLogin,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      persistLogin,
      redirect: false,
    });

    return {
      generalState: LogInStatusEnum.SUCCESS,
      form,
      errors: {
        timestamp: new Date().getTime().toString(),
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage = error.message as keyof ErrorLibraryType;
      let generalState = LogInStatusEnum.UNDEFINED;
      let generalErrorMessage = getErrorTextByKey(errorMessage);

      if (errorMessage === "emailNotVerified") {
        generalState = LogInStatusEnum.EMAIL_NOT_VERIFIED;
        generalErrorMessage = "";
      }

      return {
        generalState,
        form,
        errors: {
          general: generalErrorMessage,
          timestamp: new Date().getTime().toString(),
        },
      };
    }

    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    return {
      generalState: LogInStatusEnum.UNDEFINED,
      form,
      errors: {
        general: getErrorTextByKey("userNameUserMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }
};

export const signOutAction = async () => {
  await signOut();
};
