// import { compare, hash } from "bcrypt";
import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";

import { prisma } from "@/lib/prisma";
// import { loginSchema } from "@/lib/validations/schemas/web/signIn/loginSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(prisma);

const credentials: CredentialsConfig = {
  id: "credentials",
  type: "credentials",
  name: "Credentials",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    // const validatedCredentials = loginSchema.parse(credentials);
    console.log("credentials", credentials);
    // const user = await prisma.user.findFirst({
    //   where: {
    //     Email: validatedCredentials?.email,
    //     Password: await hash(validatedCredentials?.password, 10),
    //   },
    // });

    // if (!user) {
    //   throw new Error("Invalid credentials");
    // }

    // // Porovn8vat se bude hashovane heslo
    // if (!(await compare(validatedCredentials.password, user.Password))) {
    //   return null;
    // }

    return {};
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [Credentials(credentials), Google],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
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

        // // Zkontrolujte, zda je "rememberMe" nastaveno
        // const rememberMe = params.token.rememberMe || false;

        // const expires = rememberMe
        //   ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
        //   : null; // Platnost pouze po dobu relace

        const createdSession = await adapter.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          // TODO: Tady budu nacitat zda je zaskrtnuto pamatuj si m2 a a budu m2nit platnost tokenu. Idealn2 na session
        });
        if (!createdSession) {
          throw new Error("Failed to create session");
        }
      }

      return encode(params);
    },
  },
});
