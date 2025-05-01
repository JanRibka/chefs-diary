import { PrismaAdapter } from "@auth/prisma-adapter";
import { VerificationToken } from "@prisma/client";

import { prisma } from "../prisma";

const adapter = PrismaAdapter(prisma);

/**
 * Creates verification token
 * @param identifier Token identifier (IdUser)
 * @param token Token
 * @param expires Token expires at
 * @returns {Promise<Omit<VerificationToken, "id"> | null | undefined>}
 */
export async function createVerificationToken(
  identifier: string,
  token: string,
  expires: Date
): Promise<Omit<VerificationToken, "id"> | null | undefined> {
  return await adapter.createVerificationToken?.({
    identifier,
    token,
    expires,
  });
}
