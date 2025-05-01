import { PrismaAdapter } from "@auth/prisma-adapter";
import { VerificationToken } from "@prisma/client";

import { prisma } from "../prisma";

const adapter = PrismaAdapter(prisma);

/**
 * Creates verification token
 * @param identifier
 * @param token
 * @param expires
 * @returns VerificationToken
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
