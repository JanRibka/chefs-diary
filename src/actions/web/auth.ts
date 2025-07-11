"use server";

import { signIn, signOut } from "@/config/auth/auth";
import logInActionValidator from "@/lib/actionValidators/shared/logInActionValidator";
import signUpActionValidator from "@/lib/actionValidators/shared/signUpActionValidator";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import SignUpStatusEnum from "@/lib/enums/SignUpStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import AuthError from "@/lib/errors/AuthError";
import { registerUser } from "@/lib/services/authService";
import logger from "@/lib/services/loggerService";
import FormActionState from "@/lib/types/actions/FormActionState";
import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import {
  LogInFormErrorType,
  LogInFormType,
} from "@/lib/validations/schemas/shared/logIn/logInValidationSchema";
import {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

/**
 * Sign up action
 * @param _prev
 * @param formData
 * @returns
 */
export const signUpAction = async (
  _prev: FormActionState<SignUpStatusEnum, SignUpFormType, SignUpFormErrorType>,
  formData: FormData
): Promise<
  FormActionState<SignUpStatusEnum, SignUpFormType, SignUpFormErrorType>
> => {
  const validationResult = await signUpActionValidator(formData);

  const userName = formData.get("userName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const termsAgreement = JSON.parse(formData.get("termsAgreement") as string);

  const form: SignUpFormType = {
    userName,
    email,
    password,
    confirmPassword,
    termsAgreement,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.error };
  }

  try {
    await registerUser(userName, email, password);

    return {
      generalState: SignUpStatusEnum.SUCCESS,
      form,
      errors: {
        timestamp: new Date().getTime().toString(),
      },
    };
  } catch (error) {
    //TODO: Pouzit funkci pro nacitani erroru
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    return {
      form,
      errors: {
        general: getErrorTextByKey("registerUserMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }
};

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
    //TODO: Pouzit funkci pro nacitani erroru
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
    //TODO: Pouzit funkci pro nacitani erroru
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

/**
 * Sign out action
 */
export const signOutAction = async () => {
  await signOut();
};
