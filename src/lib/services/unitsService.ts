import { Unit, UnitGroup } from "@prisma/client";

import { UnitGroupModalDTO } from "../dTOs/admin/UnitGroupModalDTO";
import { ActionResponseDTO } from "../dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import AdminLogActionTypeEnum from "../enums/AdminLogActionTypeEnum";
import AdminLogEntityTypeEnum from "../enums/AdminLogEntityTypeEnum";
import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import {
  deleteUnitGroup as deleteUnitGroupRepository,
  getAllUnitGroups as GetAllUnitGroupsRepository,
  getAllUnitGroupsWithAssignments,
  getAllUnits as GetAllUnitsRepository,
  getUnitById as getUnitByIdRepository,
  getUnitByName,
  getUnitGroupById as getUnitGroupByIdRepository,
  getUnitGroupByName,
  insertUnit,
  insertUnitGroup,
  updateUnit,
  updateUnitGroup,
} from "../repositories/unitsRepository";
import { getErrorMessageFromError } from "../utils/error";
import { getRequireAdminPermissions } from "../utils/server";
import { logAdminAction } from "./adminLogService";

/**
 * Gets all unit groups
 * @returns {Promise<ActionResponseDTO<UnitGroup[]>>}
 */
export async function getAllUnitGroups(): Promise<
  ActionResponseDTO<PaginatedDTO<UnitGroup>>
> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_VIEW]);

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

  const insertedUnitGroup = await insertUnitGroup(name);

  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    insertedUnitGroup.idUnitGroup,
    { name }
  );

  return insertedUnitGroup;
}

/**
 * Attempts to edit a unit group with the given id.
 * Throws a notFoundError if a unit group with the id doesn't exists.
 *
 * @param idUnitGroup - The id of the unit group to edit.
 * @param name - The name of the unit group to edit.
 * @returns {Promise<UnitGroup>}
 * @throws {NotFoundError} If a unit group with the same name already exists.
 */
export async function attemptEditUnitGroup(
  idUnitGroup: number,
  name: string
): Promise<UnitGroup> {
  const unitGroup = await getUnitGroupByIdRepository(idUnitGroup);

  if (!unitGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    idUnitGroup,
    { name }
  );

  return await updateUnitGroup(idUnitGroup, name);
}

/**
 * Attempts to edit a unit group with the given id.
 * Throws a notFoundError if a unit group with the id doesn't exists.
 *
 * @param idUnitGroup - The id of the unit group to edit.
 * @param name - The name of the unit group to edit.
 * @throws {NotFoundError} If a unit group with the same name already exists.
 */
export async function deleteUnitGroup(idUnitGroup: number) {
  const unitGroup = await getUnitGroupByIdRepository(idUnitGroup);

  if (!unitGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.DELETE,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    idUnitGroup
  );

  await deleteUnitGroupRepository(idUnitGroup);
}

/**
 * Gets unit group by idUnitGroup
 * @returns {Promise<ActionResponseDTO<UnitGroup>>}
 */
export async function getUnitGroupById(
  idUnitGroup: number
): Promise<ActionResponseDTO<UnitGroup>> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

    const unitGroup = await getUnitGroupByIdRepository(idUnitGroup);

    return {
      data: unitGroup,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  }
}

/**
 * Gets all units
 * @returns {Promise<ActionResponseDTO<Unit[]>>}
 */
export async function getAllUnits(): Promise<
  ActionResponseDTO<PaginatedDTO<Unit>>
> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_VIEW]);

    const units = await GetAllUnitsRepository();

    return {
      data: units,
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
 * Attempts to insert a new unit with the given name.
 * Throws a ConflictError if a unit with the same name already exists.
 *
 * @param name - The name of the unit to insert.
 * @returns {Promise<Unit>}
 * @throws {ConflictError} If a unit with the same name already exists.
 */
export async function attemptInsertUnit(name: string): Promise<Unit> {
  const unit = await getUnitByName(name);

  if (unit) {
    throw new ConflictError();
  }

  const insertedUnit = await insertUnit(name);

  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    AdminLogEntityTypeEnum.UNIT,
    insertedUnit.idUnit,
    { name }
  );

  return insertedUnit;
}

/**
 * Attempts to edit a unit with the given id.
 * Throws a notFoundError if a unit with the id doesn't exists.
 *
 * @param idUnit - The id of the unit to edit.
 * @param name - The name of the unit to edit.
 * @returns {Promise<Unit>}
 * @throws {NotFoundError} If a unit with the same name already exists.
 */
export async function attemptEditUnit(
  idUnit: number,
  name: string
): Promise<Unit> {
  const unit = await getUnitByIdRepository(idUnit);

  if (!unit) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.UNIT,
    idUnit,
    { name }
  );

  return await updateUnit(idUnit, name);
}

/**
 * Returns unit group data associated with a specific unit,
 * formatted for use in a modal dialog.
 *
 * Each returned object includes information about whether the unit
 * is assigned to the group and whether it is marked as the base unit.
 *
 * @param idUnit - The ID of the unit for which to retrieve assigned groups.
 * @returns An array of UnitGroupModalDto objects containing basic group
 *          information and assignment status related to the given unit.
 */
export async function getUnitGroupDataForModal(
  idUnit: number
): Promise<UnitGroupModalDTO[]> {
  const groups = await getAllUnitGroupsWithAssignments(idUnit);

  return groups.map((group) => {
    const assignment = group.unitGroupUnit?.[0];

    return {
      idUnitGroup: group.idUnitGroup,
      name: group.name,
      isAssigned: !!assignment,
      isBaseUnit: assignment?.isBaseUnit ?? false,
    };
  });
}
