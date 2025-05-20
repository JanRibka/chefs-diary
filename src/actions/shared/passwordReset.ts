"use server";

import passwordResetActionValidator from "@/lib/actionValidators/auth/passwordResetActionValidator";
import PasswordResetStatusEnum from "@/lib/enums/PasswordResetStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import logger from "@/lib/services/loggerService";
import { passwordResetRequest } from "@/lib/services/passwordResetService";
import FormActionState from "@/lib/types/actions/FormActionState";
import {
  PasswordResetFormErrorType,
  PasswordResetFormType,
} from "@/lib/validations/schemas/shared/passwordReset/passwordResetFormValidationSchema";

/**
 * Forgotten password action
 * @param _prev
 * @param formData
 * @returns
 */
export const passwordResetAction = async (
  _prev: FormActionState<
    PasswordResetStatusEnum,
    PasswordResetFormType,
    PasswordResetFormErrorType
  >,
  formData: FormData
): Promise<
  FormActionState<
    PasswordResetStatusEnum,
    PasswordResetFormType,
    PasswordResetFormErrorType
  >
> => {
  const validationResult = await passwordResetActionValidator(formData);

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const token = formData.get("token") as string;

  const form: PasswordResetFormType = {
    password,
    confirmPassword,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    return {
      generalState: await passwordResetRequest(token, password),
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
        general: getErrorTextByKey("passwordResetMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }
};
