import adminMenuItems from "@/components/features/layout/admin/protectedLayout/sideBar/adminMenuItems";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import AdminMenuItemType from "@/lib/types/admin/AdminMenuItemType";

export function getPermissionsForAdminMenuItem(
  itemKey: string
): PermissionTypeEnum[] {
  for (const item of adminMenuItems) {
    if (item.key === itemKey) {
      return item.permissions ?? [];
    }

    if (item.subitems) {
      const sub = item.subitems.find(
        (s: AdminMenuItemType) => s.key === itemKey
      );
      if (sub) {
        return sub.permissions ?? [];
      }
    }
  }

  return [];
}
