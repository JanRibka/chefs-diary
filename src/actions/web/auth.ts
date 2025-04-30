"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/config/auth/auth";
import logInActionValidator from "@/lib/actionValidators/auth/logInActionValidator";
import signUpActionValidator from "@/lib/actionValidators/auth/signUpActionValidator";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import SignUpStatusEnum from "@/lib/enums/SignUpStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import AuthError from "@/lib/errors/AuthError";
import { register as registerUser } from "@/lib/services/authService";
import logger from "@/lib/services/loggerService";
import FormActionState from "@/lib/types/actions/FormActionState";
import {
  LogInFormErrorType,
  LogInFormType,
} from "@/lib/validations/schemas/web/logIn/logInSchema";
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

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const termsAgreement = JSON.parse(formData.get("termsAgreement") as string);

  const form: SignUpFormType = {
    name,
    email,
    password,
    confirmPassword,
    termsAgreement,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    await registerUser(name, email, password);

    return {
      generalState: SignUpStatusEnum.SUCCESS,
      form,
      errors: {
        general: getErrorTextByKey("registerUserMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  } catch (error) {
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
    return { form, errors: validationResult.errors };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      persistLogin,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage = error.message;

      return {
        form,
        errors: {
          general: errorMessage,
          timestamp: new Date().getTime().toString(),
        },
      };
    }

    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    return {
      form,
      errors: {
        general: getErrorTextByKey("loginUserMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }

  redirect("/dashboard");
};
