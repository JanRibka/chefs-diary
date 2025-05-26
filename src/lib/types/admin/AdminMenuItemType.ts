import { IconType } from "react-icons";

import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { RouteValue } from "@/lib/routes/adminRoutes";

type AdminMenuItemType = {
  key: string;
  label: string;
  link?: RouteValue;
  icon?: IconType;
  permissions?: PermissionTypeEnum[];
  subitems?: AdminMenuItemType[];
};

export default AdminMenuItemType;
