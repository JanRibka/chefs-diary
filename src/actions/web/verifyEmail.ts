"use server";

import resendVerificationLinkActionValidator from "@/lib/actionValidators/auth/resendVerificationLinkActionValidator";
import ResendVerificationLinkStatusEnum from "@/lib/enums/ResendVerificationLinkStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import ValidationError from "@/lib/errors/ValidationError";
import { sendSignUpEmail } from "@/lib/mail/signUpEmail";
import logger from "@/lib/services/loggerService";
import FormActionState from "@/lib/types/actions/FormActionState";
import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import {
  ResendVerificationEmailFormErrorType,
  ResendVerificationEmailFormType,
} from "@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema";

/**
 * Resents verification link fo email verification
 * @param _prev
 * @param formData
 * @returns {Promise<FormActionState<ResendVerificationLinkStatusEnum, ResendVerificationEmailFormType, ResendVerificationEmailFormErrorType>}
 */
export const resendVerificationLinkAction = async (
  _prev: FormActionState<
    ResendVerificationLinkStatusEnum,
    ResendVerificationEmailFormType,
    ResendVerificationEmailFormErrorType
  >,
  formData: FormData
): Promise<
  FormActionState<
    ResendVerificationLinkStatusEnum,
    ResendVerificationEmailFormType,
    ResendVerificationEmailFormErrorType
  >
> => {
  const validationResult = await resendVerificationLinkActionValidator(
    formData
  );

  const email = formData.get("email") as string;
  const form: ResendVerificationEmailFormType = {
    email,
  };

  if (!validationResult.success) {
    return { form, errors: validationResult.errors };
  }

  try {
    await sendSignUpEmail(email, email);

    return {
      generalState: ResendVerificationLinkStatusEnum.SUCCESS,
      form,
      errors: {
        timestamp: new Date().getTime().toString(),
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      const errorMessage = error.message as keyof ErrorLibraryType;

      return {
        generalState: ResendVerificationLinkStatusEnum.UNDEFINED,
        form,
        errors: {
          general: getErrorTextByKey(errorMessage),
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
        general: getErrorTextByKey("resendVerificationEmailMainError"),
        timestamp: new Date().getTime().toString(),
      },
    };
  }
};
