"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { RouteProperty } from "@/lib/routes/web/routes";

interface ClientReplaceGetReturnToUrlProps {
  defaultRoute: RouteProperty;
}

export default function ClientReplaceGetReturnToUrl({
  defaultRoute,
}: ClientReplaceGetReturnToUrlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? defaultRoute;

  useEffect(() => {
    router.replace(returnTo);
  }, [returnTo, router]);

  return null;
}
