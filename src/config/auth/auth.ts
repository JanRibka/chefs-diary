import NextAuth from "next-auth";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/config/prisma/prisma";
import AuthenticationModeEnum from "@/lib/enums/AuthenticationModeEnum";
import { userRepository } from "@/lib/repositories/userRepository";
import { getPermissionsByIdUser } from "@/lib/repositories/userRepository";
import { verifyUser } from "@/lib/services/authService";

import PrismaAdapterWeb from "../prisma/PrismAdapterWeb";

//TODO: Asi bych m2l ud2lat adaúter pro i pro web. GetSesionAndUser mi bude vracet nějaké blbosti kvůli user
const adapter = PrismaAdapterWeb(prisma);

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

    const user = await verifyUser(email, password);

    return {
      ...user,
      persistLogin: persistLogin,
    };
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [Credentials(credentials), Google],
  callbacks: {
    async jwt({ token, account, user, trigger }) {
      // On sign in, populate token with user data
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.idUser = user.id;
        token.name = user.name;
        token.email = user.email;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.emailVerified = (user as any).emailVerified;
        token.image = user.image;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.persistLogin = (user as any).persistLogin;

        // Log successful login
        if (user.id) {
          await userRepository.logLoginAttempt(
            user.id,
            true,
            AuthenticationModeEnum.WEB
          );
        }

        // Set token expiration based on persistLogin
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const persistLogin = (user as any).persistLogin;
        if (persistLogin) {
          // 30 days for persistent login
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
        } else {
          // 1 hour for non-persistent login
          token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
        }
      }

      // Fetch permissions on sign in or when explicitly requested
      if ((trigger === "signIn" || !token.permissions) && token.idUser) {
        const permissions = await getPermissionsByIdUser(
          token.idUser as string
        );
        token.permissions = permissions;
      }

      return token;
    },

    async session({ session, token }) {
      // Populate session from JWT token
      session.user.id = token.idUser as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.emailVerified = token.emailVerified as Date;
      session.user.image = token.image as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).permissions = token.permissions;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  cookies: {
    sessionToken: {
      name: process.env.AUTH_COOKIE_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // maxAge not set - cookie becomes session cookie (deleted when browser closes)
        // for persistLogin, this is handled by JWT expiration
      },
    },
  },
});
