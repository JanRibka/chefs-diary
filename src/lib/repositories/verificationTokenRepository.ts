import { VerificationToken } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";

/**
 * Creates verification token
 * @param identifier Token identifier (Email)
 * @param token Token
 * @param expires Token expires at
 * @returns {Promise<VerificationToken | null | undefined>}
 */
export async function createVerificationToken(
  identifier: string,
  token: string,
  expires: Date
): Promise<VerificationToken | null | undefined> {
  return await prisma.verificationToken.create({
    data: {
      identifier: identifier,
      token: token,
      expires: expires,
    },
  });
}

/**
 * Gets verification token by token
 * @param token Verification token
 * @returns {Promise<VerificationToken | null | undefined>}
 */
export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null | undefined> {
  return await prisma.verificationToken.findFirst({
    where: {
      token: token,
    },
  });
}

/**
 * Gets verification token by email
 * @param email User email
 * @returns {Promise<VerificationToken | null | undefined>}
 */
export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationToken | null | undefined> {
  return await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
    },
  });
}

/**
 * Deletes verification token
 * @param identifier Token identifier (User uuid)
 * @param token Token
 */
export async function deleteVerificationTokenByTokenAndIdentifier(
  identifier: string,
  token: string
): Promise<void> {
  await prisma.verificationToken.delete({
    where: {
      identifier: identifier,
      token: token,
    },
  });
}

/**
 * Updates verification token by email
 * @param email
 * @param verificationToken
 * @returns {Promise<VerificationToken>}
 */
export async function updateVerificationTokenByEmail(
  email: string,
  verificationToken: Partial<Omit<VerificationToken, "Identifier">>
): Promise<VerificationToken> {
  return await prisma.verificationToken.update({
    where: {
      identifier: email,
    },
    data: {
      ...verificationToken,
    },
  });
}
