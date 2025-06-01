"use server";

import forgottenPasswordActionValidator from "@/lib/actionValidators/shared/forgottenPasswordActionValidator";
import ForgottenPasswordStatusEnum from "@/lib/enums/ForgottenPasswordStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import logger from "@/lib/services/loggerService";
import { forgottenPasswordRequest } from "@/lib/services/passwordResetService";
import FormActionState from "@/lib/types/actions/FormActionState";
import {
  ForgottenPasswordFormErrorType,
  ForgottenPasswordFormType,
} from "@/lib/validations/schemas/shared/forgottenPassword/forgottenPasswordValidationSchema";

/**
 * Forgotten password action
 * @param _prev
 * @param formData
 * @returns
 */
export const forgottenPasswordAction = async (
  _prev: FormActionState<
    ForgottenPasswordStatusEnum,
    ForgottenPasswordFormType,
    ForgottenPasswordFormErrorType
  >,
  formData: FormData
): Promise<
  FormActionState<
    ForgottenPasswordStatusEnum,
    ForgottenPasswordFormType,
    ForgottenPasswordFormErrorType
  >
> => {
  const validationResult = await forgottenPasswordActionValidator(formData);

  const email = formData.get("email") as string;

  const form: ForgottenPasswordFormType = {
    email,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    await forgottenPasswordRequest(email);

    return {
      generalState: ForgottenPasswordStatusEnum.SUCCESS,
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
