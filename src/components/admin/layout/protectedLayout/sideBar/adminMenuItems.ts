import { FaDatabase, FaUserLarge } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import AdminMenuItemType from "@/lib/types/admin/AdminMenuItemType";

const adminMenuItems: AdminMenuItemType[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    link: adminRoutes.Dashboard,
    icon: RiDashboardFill,
  },
  {
    key: "users",
    label: "Uživatelé",
    permissions: [PermissionTypeEnum.USER_VIEW],
    icon: FaUserLarge,
    subitems: [
      {
        key: "all-users",
        label: "Všichni uživatelé",
        link: adminRoutes.AllUsers,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
      {
        key: "user-profile",
        label: "Profil uživatele",
        link: adminRoutes.UserProfile,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
      {
        key: "user-roles",
        label: "Práva uživatelů",
        link: adminRoutes.LogIn,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
    ],
  },
  {
    key: "web-data",
    label: "Data webu",
    permissions: [PermissionTypeEnum.UNIT_VIEW],
    icon: FaDatabase,
    subitems: [
      {
        key: "units",
        label: "Jednotky",
        link: adminRoutes.Units,
        permissions: [PermissionTypeEnum.UNIT_VIEW],
      },
      {
        key: "ingredients",
        label: "Ingredience",
        link: adminRoutes.Ingredients,
        permissions: [],
      },
    ],
  },
  {
    key: "roles-permissions",
    label: "Práva a oprávnění",
    permissions: [],
    icon: FaDatabase,
    subitems: [
      {
        key: "roles",
        label: "Práva",
        link: adminRoutes.Dashboard,
        permissions: [],
      },
      {
        key: "permissions",
        label: "Oprávnění",
        link: adminRoutes.Dashboard,
        permissions: [],
      },
    ],
  },
];

export default adminMenuItems;
