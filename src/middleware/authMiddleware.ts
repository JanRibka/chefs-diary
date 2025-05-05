//import { NextRequest, NextResponse } from "next/server";

// export function authMiddleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: "/test",
// };

// export function authMiddleware(request: NextRequest) {
//   if (request.nextUrl.pathname === "/test") {
//     return NextResponse.redirect(new URL("/prihlaseni", request.url));
//   }
//   return NextResponse.redirect(new URL("/", request.url));
// }

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { CustomMiddleware } from "./chain";

import type { NextFetchEvent, NextRequest } from "next/server";
export function authMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    return middleware(request, event, response);
  };
}

//Pokud neni poslední middleware, vrací toto

// export function withI18nMiddleware(middleware: CustomMiddleware) {
//   return async (
//   request: NextRequest,
//   event: NextFetchEvent,
//   response: NextResponse
//   ) => {

//   const pathname = request.nextUrl.pathname;
//   const pathnameIsMissingLocale = i18n.locales.every(
//   locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//  if (pathnameIsMissingLocale) {
//        const locale = getLocale(request)
//        const redirectURL = new URL(request.url)
//        if (locale) {
//          redirectURL.pathname = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
//        }

//        // Preserve query parameters
//        redirectURL.search = request.nextUrl.search

//        return NextResponse.redirect(redirectURL.toString())
//      }

//  return middleware(request, event, response);
//   };
//  }

// Perfektní dotaz – tohle je velmi běžný scénář: chceš chránit stránku (např. /dashboard), a pokud uživatel není přihlášen, tak ho přesměruješ na /login. A po přihlášení ho vrátíš zpět tam, kam původně chtěl jít.

// 🔐 Řešení krok po kroku (funguje pro App Router i Pages Router):
// ✅ 1. Ulož si redirect URL (např. returnTo=/dashboard)
// Pokud uživatel není přihlášen a pokouší se navštívit chráněnou stránku /dashboard, udělej redirect na /login?returnTo=/dashboard.

// Např. v middleware nebo v ochraně stránky:

// ts
// Zkopírovat
// Upravit
// // pseudo-kód pro redirect
// if (!isAuthenticated) {
//   router.replace(`/login?returnTo=${encodeURIComponent(currentPath)}`);
// }
// ✅ 2. V komponentě loginu čti query parametr returnTo
// V komponentě přihlášení si ho načteš a po úspěšném loginu použiješ:

// Pages Router (next/router):
// js
// Zkopírovat
// Upravit
// import { useRouter } from 'next/router';

// const router = useRouter();
// const { returnTo } = router.query;

// const redirectUrl = typeof returnTo === 'string' ? returnTo : '/dashboard';
// router.replace(redirectUrl);
// App Router (next/navigation):
// js
// Zkopírovat
// Upravit
// 'use client';
// import { useSearchParams, useRouter } from 'next/navigation';

// const router = useRouter();
// const searchParams = useSearchParams();
// const returnTo = searchParams.get('returnTo');

// const redirectUrl = returnTo || '/dashboard';
// router.replace(redirectUrl);
// ✅ 3. Kompletní příklad v login komponentě (App Router):
// js
// Zkopírovat
// Upravit
// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo');

//   const handleLogin = async () => {
//     const success = await fakeLogin();
//     if (success) {
//       router.replace(returnTo || '/dashboard');
//     }
//   };

//   return <button onClick={handleLogin}>Přihlásit se</button>;
// }

// async function fakeLogin() {
//   await new Promise((res) => setTimeout(res, 300));
//   return true;
// }
// Chceš to udělat přes middleware (middleware.ts) v Next.js 13+ pro automatické redirecty chráněných stránek?

// Řekl/a jsi:
// Jak udělám toto v next js a co to přesně dělá?

// ChatGPT řekl:
// Jasně! Reaguješ pravděpodobně na svůj předchozí dotaz – pojďme si shrnout co přesně dělá kód jako:

// js
// Zkopírovat
// Upravit
// navigate(from, { replace: true });
// a jak to udělat v Next.js, včetně vysvětlení.

// 🔍 Co to dělá? (obecně)
// Tento řádek říká:
// ➡️ *Přejdi na adresu from a zároveň nahraď aktuální URL v historii prohlížeče (místo jejího př

// Řekl/a jsi:
//   const location = useLocation();
//   const from = location.state?.from.pathname || AppRoutes.Home;

// ChatGPT řekl:
// Skvěle, teď jsi konkrétnější — rozebíráme React Router (např. v create-react-app), ale ptáš se, jak tohle udělat v Next.js. Nejprve ti vysvětlím, co ten kód dělá a pak, jak totéž implementovat v Next.js.

// ✅ Co tento kód dělá (v React Router):
// js
// Zkopírovat
// Upravit
// const location = useLocation();
// const from = location.state?.from.pathname || AppRoutes.Home;
// 🔍 Vysvětlení:
// useLocation() získá aktuální polohu (URL) + stav (state) předaný při navigaci.

// location.state?.from.pathname říká: pokud někdo přišel na aktuální stránku skrze přesměrování a v navigaci předal state s informací o tom, odkud přišel, pak použijeme tuto cestu.

// Pokud tam žádná informace není, fallback na AppRoutes.Home.

// Používá se to např. při přesměrování z chráněné stránky na login:

// js
// Zkopírovat
// Upravit
// navigate('/login', { state: { from: location } });
// Po přihlášení se pak můžeš vrátit na location.state.from.

// 🟢 Jak udělat totéž v Next.js (App Router nebo Pages Router):
// Next.js nepoužívá location.state, ale místo toho využíváš query parametry, což je standardní a bezpečný způsob.

// 🔄 1. Když uživatel není přihlášen → přesměruj ho na login s returnTo v URL
// ts
// Zkopírovat
// Upravit
// router.replace(`/login?returnTo=${encodeURIComponent(currentPath)}`);
// Např. /login?returnTo=/dashboard

// 🔐 2. Na stránce přihlášení přečti returnTo a po úspěšném loginu přesměruj:
// App Router (Next.js 13+):
// js
// Zkopírovat
// Upravit
// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo') || '/';

//   const handleLogin = async () => {
//     const success = await fakeLogin();
//     if (success) {
//       router.replace(returnTo); // Nahraď login v historii
//     }
//   };

//   return <button onClick={handleLogin}>Přihlásit se</button>;
// }
// ✳️ Shrnutí rozdílu:
// React Router	Next.js
// navigate('/login', { state })	router.push('/login?returnTo=...')
// location.state.from	searchParams.get('returnTo')

// Chceš to vylepšit i o middleware v Next.js, který automaticky chrání určité cesty?

// Řekl/a jsi:
// Ano chci to vylepši i o middleware

// ChatGPT řekl:
// Skvěle! Ukážu ti, jak v Next.js s App Routerem (složka /app) vytvořit middleware.ts, který automaticky ochrání určité stránky (např. /dashboard) a přesměruje nepřihlášené uživatele na login s returnTo.

// ✅ 1. Struktura projektu (základ)
// bash
// Zkopírovat
// Upravit
// /app
//   /dashboard        <-- chráněná stránka
//   /login
// /middleware.ts      <-- sem dáš redirect logiku
// ✅ 2. Vytvoř middleware: middleware.ts v rootu projektu
// ts
// Zkopírovat
// Upravit
// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const isAuthenticated = request.cookies.get('sessionToken')?.value;

//   const protectedPaths = ['/dashboard', '/profile', '/settings'];
//   const { pathname } = request.nextUrl;

//   const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

//   if (isProtected && !isAuthenticated) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('returnTo', pathname); // přidá např. ?returnTo=/dashboard
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }
// ✅ 3. Přidej matcher, aby middleware neplatil pro každou stránku
// V middleware.ts (nebo zvlášť v next.config.js):

// ts
// Zkopírovat
// Upravit
// // middleware.ts
// export const config = {
//   matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
// };
// Ujisti se, že /login není zahrnuta v matcheru — jinak vytvoříš nekonečný redirect.

// ✅ 4. Na stránce přihlášení použij returnTo
// tsx
// Zkopírovat
// Upravit
// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo') || '/';

//   const handleLogin = async () => {
//     const success = await fakeLogin();
//     if (success) {
//       // Příklad: uložení cookie (v reálném světě uděláš API request)
//       document.cookie = "sessionToken=abc123; path=/";
//       router.replace(returnTo); // přesměrování zpět
//     }
//   };

//   return <button onClick={handleLogin}>Přihlásit se</button>;
// }
// ✅ 5. Po přihlášení bude uživatel přesměrován zpět, ale login z historie bude nahrazen.
// 🔐 Reálné nasazení
// V reálné appce:

// místo cookie sessionToken budeš používat např. NextAuth, JWT, OAuth nebo middleware validující session přes server.

// můžeš místo prosté cookie číst například Authorization header nebo použít getToken() z NextAuth.

// Chceš verzi s NextAuth.js a middlewarem, který kontroluje getToken() z cookies?
