"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { RouteValue as AdminRouteValue } from "@/lib/routes/adminRoutes";
import { RouteValue as WebRouteValue } from "@/lib/routes/webRoutes";

interface Props {
  defaultRoute: WebRouteValue | AdminRouteValue;
}

export default function ClientReplaceGetReturnToUrl({ defaultRoute }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? defaultRoute;

  useEffect(() => {
    router.replace(returnTo);
  }, [returnTo, router]);

  return null;
}
