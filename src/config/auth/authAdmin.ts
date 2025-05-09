// Ano, pokud chceš mít dvě nezávislé přihlášení (například jedno pro běžné uživatele/editory a druhé pro administrátory), budeš potřebovat dva samostatné konfigurační setupy pro Auth.js (NextAuth.js). To znamená:

// ✅ Dvě samostatné instance Auth.js
// Např.:

// /api/auth/editor/[...nextauth].ts – pro editor přihlášení

// /api/auth/admin/[...nextauth].ts – pro admin přihlášení

// Každá bude mít:

// vlastní session callback

// vlastní jwt callback (např. pro role)

// vlastní cookie konfiguraci (jiné jméno cookie)

// vlastní signIn stránku

// ✍️ Příklad základní konfigurace
// 1. Editor Auth:
// ts
// Zkopírovat
// Upravit
// // pages/api/auth/editor/[...nextauth].ts

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Editor Login",
//       async authorize(credentials) {
//         const user = await findUser(credentials); // jen editor
//         if (user?.role === "editor") return user;
//         return null;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   cookies: {
//     sessionToken: {
//       name: "__Secure-kd-editor-session",
//       options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
//     },
//   },
// });
// 2. Admin Auth:
// ts
// Zkopírovat
// Upravit
// // pages/api/auth/admin/[...nextauth].ts

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Admin Login",
//       async authorize(credentials) {
//         const user = await findUser(credentials); // jen admin
//         if (user?.role === "admin") return user;
//         return null;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   cookies: {
//     sessionToken: {
//       name: "__Secure-kd-admin-session",
//       options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
//     },
//   },
// });
// 📌 Tipy
// Ujisti se, že každé přihlášení používá odlišné cookie jméno – jinak se budou přepisovat.

// Při získávání session (např. getServerSession) nezapomeň použít odpovídající konfiguraci pro danou část aplikace.

// Pokud se přihlašuješ na obou částech současně, cookies se musí načítat a validovat zvlášť.

// Chceš i middleware, který rozlišuje přístup podle těchto cookies?

// Řekl/a jsi:
// Ano chci

// ChatGPT řekl:
// Skvěle — tady je příklad, jak můžeš v Next.js middleware rozlišovat přístup na základě dvou různých přihlašovacích cookies (např. editor vs. admin), pokud používáš NextAuth.js (Auth.js):

// 📁 /middleware.ts

// ts
// Zkopírovat
// Upravit
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const editorCookieName = "__Secure-kd-editor-session";
// const adminCookieName = "__Secure-kd-admin-session";

// // Cesty, které vyžadují admin přístup
// const adminPaths = ["/kucharuv-denik/admin"];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     cookieName: isAdminPath ? adminCookieName : editorCookieName,
//   });

//   if (!token) {
//     const redirectUrl = isAdminPath ? "/kucharuv-denik/admin/login" : "/kucharuv-denik/login";
//     return NextResponse.redirect(new URL(redirectUrl, req.url));
//   }

//   // Volitelně: Zkontroluj roli uživatele
//   if (isAdminPath && token.role !== "admin") {
//     return NextResponse.redirect(new URL("/403", req.url)); // nebo jiná stránka pro odmítnutí
//   }

//   return NextResponse.next();
// }

// // Definuj, kde se middleware spouští
// export const config = {
//   matcher: ["/kucharuv-denik/:path*", "/kucharuv-denik/admin/:path*"],
// };
// 🔐 Vysvětlení:

// getToken() získá JWT z příslušné cookies (editor nebo admin).

// Rozliší, jestli jsi na admin cestě, a použije správnou cookie.

// Ověří, jestli máš roli admin pro přístup na admin cestu.

// Přesměruje nepřihlášené uživatele na odpovídající login stránku.

// 💡 Tipy:

// V editor a admin Auth.js konfiguraci dbej na to, aby cookieName odpovídalo tomu, co zde nastavuješ.

// Do tokenu si můžeš v jwt callbacku ukládat role: token.role = user.role.

// Chceš, abych ti pomohl doplnit i správné jwt callbacky v konfiguraci Auth.js?

import NextAuth from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { logIn, verifyUser } from "@/lib/services/authService";

import PrismaAdapterAdmin from "../prisma/PrismAdapterAdmin";

const adapter = PrismaAdapterAdmin(prisma);

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
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.idUser = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.persistLogin = (user as any).persistLogin;
      }

      return token;
    },
  },

  session: {
    strategy: "database",
  },

  cookies: {
    sessionToken: {
      name: process.env.AUTH_ADMIN_COOKIE_NAME,
    },
  },

  jwt: {
    encode: async function (params) {
      const sessionToken = await logIn(params);

      if (typeof sessionToken === "string") {
        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});
