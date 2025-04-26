import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";

import { prisma } from "@/lib/prisma";
import { attemptLogIn } from "@/lib/services/authService";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(prisma);

const credentials: CredentialsConfig = {
  id: "credentials",
  type: "credentials",
  name: "Credentials",
  credentials: {
    email: {},
    password: {},
    persistLogin: {},
  },
  authorize: async (credentials) => {
    const email = credentials.email as string;
    const password = credentials.password as string;
    const persistLogin =
      JSON.parse(credentials.persistLogin as string) ?? false;

    const user = await attemptLogIn(email, password);

    return {
      id: user.IdUser,
      name: user.Login,
      email: user.Email,
      image: user.Image,
      persistLogin: persistLogin,
    };
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [Credentials(credentials), Google],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.persistLogin = (user as any).persistLogin;
      }

      return token;
    },
  },

  jwt: {
    encode: async function (params) {
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
          // TODO: Tady budu nacitat zda je zaskrtnuto pamatuj si m2 a a budu m2nit platnost tokenu. Idealn2 na session
        });
        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }

      return encode(params);
    },
  },
});
