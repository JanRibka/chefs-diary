import { auth as authWeb } from "@/config/auth/auth";
import { auth as authAdmin } from "@/config/auth/authAdmin";

import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import ForbiddenError from "../errors/ForbiddenError";
import UnauthorizedError from "../errors/UnauthorizedError";

/**
 * Verifies that the currently authenticated web user is authorized and has the required permissions.
 * @param permissions An array of required permissions (e.g., from the `PermissionTypeEnum`) needed to perform the action.
 * @throws {UnauthorizedError} If the user is not authenticated.
 * @throws {ForbiddenError} If the user lacks the required permissions.
 */
export async function getRequireWebPermissions(
  permissions: PermissionTypeEnum[]
) {
  const session = await authWeb();

  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const userPermissions =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((session?.user as any).permissions as number[]) || [];

  const hasRequired = permissions.some((p) => userPermissions.includes(p));
  if (!hasRequired) {
    throw new ForbiddenError();
  }
}

/**
 * Verifies that the currently authenticated admin user is authorized and has the required permissions.
 * @param permissions An array of required permissions (e.g., from the `PermissionTypeEnum`) needed to perform the action.
 * @throws {UnauthorizedError} If the user is not authenticated.
 * @throws {ForbiddenError} If the user lacks the required permissions.
 */
export async function getRequireAdminPermissions(
  permissions: PermissionTypeEnum[]
) {
  const session = await authAdmin();

  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const userPermissions =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((session?.user as any).permissions as number[]) || [];

  const hasRequired = permissions.some((p) => userPermissions.includes(p));
  if (!hasRequired) {
    throw new ForbiddenError();
  }
}
