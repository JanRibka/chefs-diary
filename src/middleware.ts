import { NextRequest, NextResponse } from "next/server";

import webRoutes, { RouteValue } from "./lib/routes/web/routes";

export default function middleware(request: NextRequest) {
  //TODO: Přidat admin routes
  const routeValues = Object.values(webRoutes);

  if (routeValues.includes(request.nextUrl.pathname as RouteValue)) {
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
}
