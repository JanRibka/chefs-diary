"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useUserContext } from "@/context/UserContext";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { RouteValue as AdminRouteValue } from "@/lib/routes/adminRoutes";
import { RouteValue as WebRouteValue } from "@/lib/routes/webRoutes";

type Props = {
  allowedPermissions: PermissionTypeEnum[];
  children: ReactNode;
  redirectPath: WebRouteValue | AdminRouteValue;
};

export default function RedirectUnpermittedPage({
  allowedPermissions,
  children,
  redirectPath,
}: Props) {
  const { user } = useUserContext();
  const router = useRouter();

  const isAllowed =
    allowedPermissions.length === 0 ||
    user?.permissions.some((permission) =>
      allowedPermissions.includes(permission)
    );

  useEffect(() => {
    if (!isAllowed && user) {
      router.replace(redirectPath);
    }
  }, [isAllowed, redirectPath, router, user]);

  // Return null because redirect will be done after the component mounts
  // TODO: Pokud není uživatel, můžu dát loading, ale moc se mi ho nechce ukazovat. Raději asi null
  if (!isAllowed || !user) {
    return null;
  }

  return <>{children}</>;
}
