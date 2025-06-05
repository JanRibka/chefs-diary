import { FaDatabase, FaUnity, FaUserLarge } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

const adminMenuItemsIconMap = {
  RiDashboardFill,
  FaUserLarge,
  FaUnity,
  FaDatabase,
};

export type AdminMenuItemsIconMapType = keyof typeof adminMenuItemsIconMap;

export default adminMenuItemsIconMap;
