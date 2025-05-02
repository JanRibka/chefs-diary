import { VerificationToken } from "@prisma/client";

import { prisma } from "../prisma";

//TODO: asi bych mohl odevsud odjebat adapter a poutivat porismu aupravit si tabulky podle sebe
/**
 * Creates verification token
 * @param identifier Token identifier (User uuid)
 * @param token Token
 * @param expires Token expires at
 * @returns {Promise<Omit<VerificationToken, "id"> | null | undefined>}
 */
export async function createVerificationToken(
  identifier: string,
  token: string,
  expires: Date
): Promise<VerificationToken | null | undefined> {
  return await prisma.verificationToken.create({
    data: {
      Identifier: identifier,
      Token: token,
      Expires: expires,
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
      Token: token,
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
      Identifier: identifier,
      Token: token,
    },
  });
}
