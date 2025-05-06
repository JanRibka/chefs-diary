import { JWTEncodeParams } from 'next-auth/jwt';
import { v4 as uuid } from 'uuid';

import {
    createSession as createSessionRepository, getSessionBySessionToken
} from '@/lib/repositories/sessionRepository';

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
    debugger;
    const persistLogin = params.token.persistLogin;
    //TODO: Nějak bych měl nastavit platnost na session, pokud persistLogin na false
    const expires = persistLogin
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
      : null;

    const createdSession = await createSessionRepository(
      sessionToken,
      params.token.idUser as string,
      expires
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
