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
 * Create admin session
 * @param sessionToken Session token value
 * @param idUser User Id
 * @param expires Expiration date
 * @returns {Promise<AdapterSession | undefined>}
 */
export async function createSessionAdmin(
  sessionToken: string,
  idUser: string,
  expires: Date
): Promise<Session | undefined> {
  return await prisma.sessionAdmin.create({
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
 * Gets admin session by session token
 * @param sessionToken Session token value
 * @returns {Promise<Session | null>}
 */
export async function getSessionAdminBySessionToken(
  sessionToken: string
): Promise<Session | null> {
  return await prisma.sessionAdmin.findFirst({
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

/**
 * Deletes admin session by userId
 * @param idUser User Id
 */
export async function deleteSessionAdminByIdUser(
  idUser: string
): Promise<void> {
  await prisma.sessionAdmin.deleteMany({
    where: {
      userId: idUser,
    },
  });
}
