import { AdminMenuItemsIconMapType } from "@/components/features/layout/admin/protectedLayout/sideBar/adminMenuItemsIconMap";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { RouteValue } from "@/lib/routes/adminRoutes";

type AdminMenuItemType = {
  key: string;
  label: string;
  link?: RouteValue;
  icon?: AdminMenuItemsIconMapType;
  permissions?: PermissionTypeEnum[];
  subitems?: AdminMenuItemType[];
};

export default AdminMenuItemType;
