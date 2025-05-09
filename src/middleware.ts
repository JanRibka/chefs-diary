import { NextRequest, NextResponse } from "next/server";

import adminRoutes, {
  RouteValue as AdminRouteValue,
} from "./lib/routes/adminRoutes";
import webRoutes, { RouteValue as WebRouteValue } from "./lib/routes/webRoutes";

export default function middleware(request: NextRequest) {
  const routeValues = [
    ...Object.values(webRoutes),
    ...Object.values(adminRoutes),
  ];

  if (
    routeValues.includes(
      request.nextUrl.pathname as WebRouteValue | AdminRouteValue
    )
  ) {
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
