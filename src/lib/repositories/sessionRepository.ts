import { Session } from "@prisma/client";

import { prisma } from "../prisma";

/**
 * Create session
 * @param sessionToken Session token value
 * @param idUser User Id
 * @param expires Expiration date
 * @returns {Promise<AdapterSession | undefined>}
 */
export async function createSession(
  sessionToken: string,
  idUser: string,
  expires: Date
): Promise<Session | undefined> {
  return await prisma.session.create({
    data: {
      sessionToken: sessionToken,
      userId: idUser,
      expires: expires,
    },
  });
}

/**
 * Gets session by session token
 * @param sessionToken Session token value
 * @returns {Promise<Session | null>}
 */
export async function getSessionBySessionToken(
  sessionToken: string
): Promise<Session | null> {
  return await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });
}

/**
 * Deletes session by userId
 * @param idUser User Id
 */
export async function deleteSessionByIdUser(idUser: string): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userId: idUser,
    },
  });
}
