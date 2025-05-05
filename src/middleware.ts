import { NextRequest, NextResponse } from "next/server";

import webRoutes from "./lib/routes/web/routes";

export default function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
//TODO: Nefunguje matcher
const matcher = Object.values(webRoutes);
//TODO: Přidat admin routes
// matcher.push(Object.values(adminRoutes))

export const config = {
  matcher: matcher,
};
