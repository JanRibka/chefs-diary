import { PasswordResetToken } from "@prisma/client";

import { prisma } from "../prisma";

/**
 * Creates password reset token
 * @param identifier Token identifier (Email)
 * @param token Token
 * @param expires Token expires at
 * @returns {Promise<PasswordResetToken | null | undefined>}
 */
export async function createPasswordResetToken(
  identifier: string,
  token: string,
  expires: Date
): Promise<PasswordResetToken | null | undefined> {
  return await prisma.passwordResetToken.create({
    data: {
      Identifier: identifier,
      Token: token,
      Expires: expires,
    },
  });
}

/**
 * Invalidates all password reset tokens by email
 * @param email User email
 */
export async function invalidateAllPasswordResetTokensByEmail(email: string) {
  await prisma.passwordResetToken.updateMany({
    where: {
      Identifier: email,
    },
    data: {
      Expires: new Date(0),
    },
  });
}

/**
 * Gets password reset token by token
 * @param token Password reset token
 * @returns {Promise<VerificationToken | null | undefined>}
 */
export async function getPasswordResetTokenByToken(
  token: string
): Promise<PasswordResetToken | null | undefined> {
  return await prisma.passwordResetToken.findFirst({
    where: {
      Token: token,
    },
  });
}

/**
 * Deletes all password reset tokens by email
 * @param email User email
 */
export async function deleteAllPasswordResetTokensByEmail(email: string) {
  await prisma.passwordResetToken.deleteMany({
    where: {
      Identifier: email,
    },
  });
}
