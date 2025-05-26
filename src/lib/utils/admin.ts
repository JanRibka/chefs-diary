import adminMenuItems from "@/components/admin/layout/protectedLayout/sideBar/adminMenuItems";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

export function getPermissionsForAdminMenuItem(
  itemKey: string
): PermissionTypeEnum[] {
  for (const item of adminMenuItems) {
    if (item.key === itemKey) {
      return item.permissions ?? [];
    }

    if (item.subitems) {
      const sub = item.subitems.find((s) => s.key === itemKey);
      if (sub) {
        return sub.permissions ?? [];
      }
    }
  }

  return [];
}
