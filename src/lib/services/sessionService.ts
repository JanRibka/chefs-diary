import { JWTEncodeParams } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "../prisma";

const adapter = PrismaAdapter(prisma);

export async function createSession(
  params: JWTEncodeParams
): Promise<string | undefined> {
  if (params.token?.credentials) {
    const sessionToken = uuid();

    if (!params.token.sub) {
      throw new Error("No user ID found in token");
    }

    const persistLogin = params.token.persistLogin;

    const expires = persistLogin
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
      : new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hodina

    const createdSession = await adapter.createSession?.({
      sessionToken: sessionToken,
      userId: params.token.sub,
      expires: expires,
    });
    if (!createdSession) {
      throw new Error("Failed to create session");
    }

    return sessionToken;
  }
}
//TODO: Toto p5ejebat do session repository
export async function getSessionExists(sessionToken: string) {
  // await
  return (
    (await prisma.session.findFirst({
      where: {
        sessionToken: sessionToken,
      },
    })) !== null
  );
}

export async function deleteSessionByIdUser(idUser: string) {
  const sessions = await prisma.session.findMany({
    where: {
      userId: idUser,
    },
  });

  await prisma.user.update({
    where: {
      IdUser: idUser,
    },
    data: {
      Sessions: {
        deleteMany: {},
      },
    },
  });

  await Promise.all(
    sessions.map((item) => adapter.deleteSession?.(item.sessionToken))
  );
}
