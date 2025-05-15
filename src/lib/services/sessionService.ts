import { JWTEncodeParams } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

import {
  createSession as createSessionRepository,
  createSessionAdmin as createSessionAdminRepository,
  getSessionAdminBySessionToken,
  getSessionBySessionToken,
} from "@/lib/repositories/sessionRepository";

import { getIpAddressFromHeaders } from "../utils/headers";

/**
 * Creates session
 * @param params JWT encode parameters
 * @returns {Promise<string | undefined>}
 */
export async function createSession(
  params: JWTEncodeParams
): Promise<string | undefined> {
  if (params.token?.credentials) {
    const sessionToken = uuid();

    if (!params.token.sub) {
      throw new Error("No user ID found in token");
    }
    const ipAddress = await getIpAddressFromHeaders();
    const persistLogin = params.token.persistLogin;
    const expires = persistLogin
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
      : new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hodina
    //TODO: Zjistit, zda se znevalidní stará session, pokud se znova přihlásím. Ot8zka jestli by se m2ly nevalidovat. Můžu se přihlásit z různých počítaů a pak jsem v háji. Pak bych tam musle pridat IP adresu
    const createdSession = await createSessionRepository(
      sessionToken,
      params.token.idUser as string,
      expires,
      ipAddress ?? ""
    );
    if (!createdSession) {
      throw new Error("Failed to create session");
    }

    return sessionToken;
  }
}

/**
 * Creates admin session
 * @param params JWT encode parameters
 * @returns {Promise<string | undefined>}
 */
export async function createSessionAdmin(
  params: JWTEncodeParams
): Promise<string | undefined> {
  if (params.token?.credentials) {
    const sessionToken = uuid();

    if (!params.token.sub) {
      throw new Error("No user ID found in token");
    }

    const ipAddress = await getIpAddressFromHeaders();
    const persistLogin = params.token.persistLogin;
    const expires = persistLogin
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
      : new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hodina
    //TODO: Zjistit, zda se znevalidní stará session, pokud se znova přihlásím
    const createdSession = await createSessionAdminRepository(
      sessionToken,
      params.token.idUser as string,
      expires,
      ipAddress ?? ""
    );
    if (!createdSession) {
      throw new Error("Failed to create session");
    }

    return sessionToken;
  }
}

/**
 * Gets if session exists by session token
 * @param sessionToken Session token
 * @returns {Promise<boolean>}
 */
export async function getSessionExists(sessionToken: string): Promise<boolean> {
  return (await getSessionBySessionToken(sessionToken)) !== null;
}

/**
 * Gets if admin session exists by session token
 * @param sessionToken Session token
 * @returns {Promise<boolean>}
 */
export async function getSessionAdminExists(
  sessionToken: string
): Promise<boolean> {
  return (await getSessionAdminBySessionToken(sessionToken)) !== null;
}
