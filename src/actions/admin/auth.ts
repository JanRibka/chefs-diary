"use server";

import { signIn, signOut } from "@/config/auth/authAdmin";
import logInActionValidator from "@/lib/actionValidators/auth/logInActionValidator";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import FormActionState from "@/lib/types/actions/FormActionState";
import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import {
  getAuthErrorFromError,
  getErrorMessageFromError,
} from "@/lib/utils/error";
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
    return { form, errors: validationResult.error };
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
    const { errorMessage, isAuthError } =
      getAuthErrorFromError<ErrorLibraryType>(error);

    if (isAuthError) {
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

    getErrorMessageFromError(error, { consoleErrorTitle: "Login action" });

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

/**
 * Sign out action
 */
export const signOutAction = async () => {
  await signOut();
};
