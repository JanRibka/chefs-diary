import { UnitGroup } from '@prisma/client';

import { PaginatedDTO } from '../dTOs/shared/PaginatedDTO';
import { ServiceResponseDTO } from '../dTOs/shared/ServiceResponseDTO';
import PermissionTypeEnum from '../enums/PermissionTypeEnum';
import { getAllUnitGroups as GetAllUnitGroupsRepository } from '../repositories/webDataRepository';
import { getErrorMessageFromError } from '../utils/error';
import { getRequireAdminPermissions } from '../utils/server';

/**
 * Gets all unit groups
 * @returns {Promise<ServiceResponseDTO<UnitGroup[]>>}
 */
export async function getAllUnitGroups(): Promise<
  ServiceResponseDTO<PaginatedDTO<UnitGroup>>
> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);

    const unitGroups = await GetAllUnitGroupsRepository();

    return {
      data: unitGroups,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: { items: [], totalCount: 0 },
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  }
}
