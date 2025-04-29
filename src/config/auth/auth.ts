import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { attemptLogIn, logIn } from "@/lib/services/authService";
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
      name: user.Name,
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
      debugger;
      const sessionToken = await logIn(params);

      if (typeof sessionToken === "string") {
        return sessionToken;
      }

      return encode(params);
    },
  },
});
