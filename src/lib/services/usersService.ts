import { PaginatedDTO } from "../dTOs/admin/shared/PaginatedDTO";
import UserWithStatsDTO from "../dTOs/admin/UserWithStatsDTO";
import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import { getAllUsersPaginated } from "../repositories/userRepository";
import { getErrorMessageFromError } from "../utils/error";
import { getRequireAdminPermissions } from "../utils/server";

/**
 *
 * @returns
 */
export default async function getAllUsers(
  page: number,
  pageSize: number
): Promise<PaginatedDTO<UserWithStatsDTO>> {
  await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);

  try {
    return await getAllUsersPaginated(page, pageSize);
  } catch (error) {
    getErrorMessageFromError(error, true);

    return {
      data: [],
      totalCount: 0,
      page: page,
      pageSize: pageSize,
    };
  }
}
