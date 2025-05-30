import { UnitGroup } from "@prisma/client";

import { ActionResponseDTO } from "../dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import ConflictError from "../errors/ConflictError";
import {
  getAllUnitGroups as GetAllUnitGroupsRepository,
  getUnitGroupByName,
  insertUnitGroup,
} from "../repositories/webDataRepository";
import { getErrorMessageFromError } from "../utils/error";
import { getRequireAdminPermissions } from "../utils/server";

/**
 * Gets all unit groups
 * @returns {Promise<ActionResponseDTO<UnitGroup[]>>}
 */
export async function getAllUnitGroups(): Promise<
  ActionResponseDTO<PaginatedDTO<UnitGroup>>
> {
  debugger;
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);
    debugger;
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

/**
 * Attempts to insert a new unit group with the given name.
 * Throws a ConflictError if a unit group with the same name already exists.
 *
 * @param name - The name of the unit group to insert.
 * @returns {Promise<UnitGroup>}
 * @throws {ConflictError} If a unit group with the same name already exists.
 */
export async function attemptInsertUnitGroup(name: string): Promise<UnitGroup> {
  const unitGroup = await getUnitGroupByName(name);

  if (unitGroup) {
    throw new ConflictError();
  }

  return await insertUnitGroup(name);
}
