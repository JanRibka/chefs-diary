import logger from "@/lib/services/loggerService";

import VerifyEmailStatusEnum from "../enums/VerifyEmailStatusEnum";
import ValidationError from "../errors/ValidationError";
import { sendSignUpEmail } from "../mail/signUpEmail";
import { updateUserInfoByEmail } from "../repositories/userRepository";
import {
  deleteVerificationTokenByTokenAndIdentifier,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "../repositories/verificationTokenRepository";

/**
 * Verifies email
 * @param token
 * @returns {Promise<VerifyEmailStatusEnum>}
 */
export async function verifyEmail(
  token: string
): Promise<VerifyEmailStatusEnum> {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return VerifyEmailStatusEnum.TOKEN_NOT_FOUND;
  } else if (verificationToken.Expires < new Date()) {
    return VerifyEmailStatusEnum.TOKEN_EXPIRED;
  }

  try {
    await deleteVerificationTokenByTokenAndIdentifier(
      verificationToken?.Identifier,
      verificationToken?.Token
    );

    await updateUserInfoByEmail(verificationToken.Identifier, {
      EmailVerifiedAt: new Date(),
    });

    return VerifyEmailStatusEnum.SUCCESS;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    return VerifyEmailStatusEnum.VALIDATION_ERROR;
  }
}

/**
 * Resents verification email
 * @param email
 */
export async function resendVerificationEmail(email: string) {
  const verificationToken = await getVerificationTokenByEmail(email);

  if (!verificationToken) {
    throw new ValidationError("verificationTokenNotFound");
  }

  await sendSignUpEmail(email, email, true);
}
