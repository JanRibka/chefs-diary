"use client";

import { useUserContext } from "@/context/UserContext";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

type Props = {
  allowedPermissions?: PermissionTypeEnum[];
  children: React.ReactNode;
};
// TODO: Kdyby to byla serverová komponenta, tak by se mi menu vyrenderovalo už na serveru a neproblikávalo by
export default function HideContentNoPermission({
  allowedPermissions,
  children,
}: Props) {
  const { user } = useUserContext();

  if (
    allowedPermissions?.length &&
    !user?.permissions.some((permission) =>
      allowedPermissions.includes(permission)
    )
  ) {
    return null; // Hide content if user doesn't have any of the allowed permissions
  }

  return <>{children}</>;
}
