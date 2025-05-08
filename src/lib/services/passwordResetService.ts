import PasswordResetStatusEnum from "../enums/PasswordResetStatusEnum";
import { sendForgottenPasswordEmail } from "../mail/forgottenPasswordEmail";
import {
  deleteAllPasswordResetTokensByEmail,
  getPasswordResetTokenByToken,
} from "../repositories/passwordResetRepository";
import {
  getUserByEmail,
  updateUserByIdUser,
} from "../repositories/userRepository";
import { hashPassword } from "./hashService";

/**
 * Request to send forgotten password email
 * @param email
 */
export async function forgottenPasswordRequest(email: string) {
  const user = await getUserByEmail(email);

  if (user) {
    await sendForgottenPasswordEmail(email, email);
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

/**
 * Verifies password reset token
 * @param token Password reset token
 * @returns {Promise<PasswordResetStatusEnum>}
 */
export async function verifyPasswordResetToken(
  token: string
): Promise<PasswordResetStatusEnum> {
  const passwordResetToken = await getPasswordResetTokenByToken(token);

  if (!passwordResetToken) {
    return PasswordResetStatusEnum.TOKEN_NOT_FOUND;
  } else if (passwordResetToken.Expires < new Date()) {
    return PasswordResetStatusEnum.TOKEN_EXPIRED;
  }

  return PasswordResetStatusEnum.SUCCESS;
}

/**
 * Request to change user password
 * @param token Password reset token
 * @param password New password
 * @returns {Promise<PasswordResetStatusEnum>}
 */
export async function passwordResetRequest(
  token: string,
  password: string
): Promise<PasswordResetStatusEnum> {
  const verifyPasswordResult = await verifyPasswordResetToken(token);

  if (verifyPasswordResult !== PasswordResetStatusEnum.SUCCESS) {
    return verifyPasswordResult;
  }

  const hashedPassword = await hashPassword(password);
  const passwordResetToken = await getPasswordResetTokenByToken(token);
  const user = await getUserByEmail(passwordResetToken?.Identifier ?? "");

  if (user) {
    await updateUserByIdUser(user?.IdUser, { Password: hashedPassword });
    await deleteAllPasswordResetTokensByEmail(
      passwordResetToken?.Identifier ?? ""
    );
  }

  return verifyPasswordResult;
}
