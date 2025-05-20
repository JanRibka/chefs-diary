import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import { getAllUsersPaged } from "../repositories/userRepository";
import { getRequireAdminPermissions } from "../utils/server";

/**
 *
 * @returns
 */
export default async function getAllUsers() {
  await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);

  try {
    return await getAllUsersPaged();
  } catch (error) {
    //TODO: Ud2lat funkci, kter8 z erroru bude na49ta message
  }

  debugger;
}
