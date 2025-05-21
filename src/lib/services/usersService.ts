import UserWithStatsDTO from '../dTOs/admin/UserWithStatsDTO';
import PermissionTypeEnum from '../enums/PermissionTypeEnum';
import { getAllUsers as getAllUsersRepository } from '../repositories/userRepository';
import { getErrorMessageFromError } from '../utils/error';
import { getRequireAdminPermissions } from '../utils/server';

/**
 *
 * @returns
 */
export async function getAllUsers(): Promise<UserWithStatsDTO[]> {
  await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);

  try {
    return await getAllUsersRepository();
  } catch (error) {
    getErrorMessageFromError(error, true);

    return [];
  }
}
