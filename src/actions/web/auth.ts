"use server";

import { redirect } from 'next/navigation';

import { signIn as logIn } from '@/config/auth/auth';
import signUpActionValidator from '@/lib/actionValidators/auth/signUpActionValidator';
import getErrorTextByKey from '@/lib/errorLibrary/auth/authErrorLibrary';
import webRoutes from '@/lib/routes/web/routes';
import { register as registerUser } from '@/lib/services/authService';
import logger from '@/lib/services/loggerService';
import FormActionState from '@/lib/types/actions/FormActionState';
import {
    SignUpFormErrorType, SignUpFormType
} from '@/lib/validations/schemas/web/signUp/signUpFormValidationSchema';

// import { loginSchema } from "@/lib/validations/web/login/loginSchema";

export const signUpAction = async (
  _prev: FormActionState<SignUpFormType, SignUpFormErrorType>,
  formData: FormData
): Promise<FormActionState<SignUpFormType, SignUpFormErrorType>> => {
  const validationResult = await signUpActionValidator(formData);

  const login = formData.get("login") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const termsAgreement = JSON.parse(formData.get("termsAgreement") as string);

  const form: SignUpFormType = {
    login,
    email,
    password,
    confirmPassword,
    termsAgreement,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    await registerUser(login, email, password);
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

  redirect(webRoutes.Login);
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  // const validatedData = loginSchema.parse({ email, password });
  const response = await logIn("credentials", {
    email,
    password,
    redirect: false, //TODO: Zjistit, co to dělá
  });

  if (response?.ok) redirect("/dashboard");
  if (response?.error) {
  }
};
