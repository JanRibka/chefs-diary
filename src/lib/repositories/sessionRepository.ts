import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "../prisma";

const adapter = PrismaAdapter(prisma);

/**
 * Create session
 * @param sessionToken
 * @param idUser
 * @param expires
 * @returns Session
 */
export async function createSession(
  sessionToken: string,
  idUser: string,
  expires: Date
) {
  return await adapter.createSession?.({
    sessionToken: sessionToken,
    userId: idUser,
    expires: expires,
  });
}

/**
 *
 * @param sessionToken
 * @returns Session | null
 */
export async function getSessionBySessionToken(sessionToken: string) {
  return await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });
}

/**
 * Delete session by userId
 * @param idUser
 */
export async function deleteSessionByIdUser(idUser: string) {
  await prisma.session.deleteMany({
    where: {
      userId: idUser,
    },
  });
}
