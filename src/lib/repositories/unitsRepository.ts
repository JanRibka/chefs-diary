import { Unit, UnitGroup } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";
import { UnitGroupsWithAssignmentsDTO } from "../dTOs/admin/UnitGroupWithAssignmentsDTO";
import { UnitGroupWithDetailDTO } from "../dTOs/admin/UnitGroupWithDetailDTO";
import { UnitWithGroupInfoDTO } from "../dTOs/admin/UnitWithGroupInfoDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";

/**
 * Get all units
 * @returns {Promise<Unit[]>}
 */
export async function getAllUnits(): Promise<Unit[]> {
  return await prisma.unit.findMany({
    cacheStrategy: {
      ttl: 3600,
      swr: 1200,
      tags: ["all_units"],
    },
  });
}

/**
 * Inserts unit
 * @param name Unit name
 * @returns {Promise<Unit>}
 */
export async function insertUnit(name: string): Promise<Unit> {
  return await prisma.unit.create({
    data: {
      name: name,
    },
  });
}

/**
 * Get unit by name
 * @param name Unit name
 * @returns {Promise<Unit | null>}
 */
export async function getUnitByName(name: string): Promise<Unit | null> {
  return await prisma.unit.findUnique({
    where: {
      name: name,
    },
  });
}

/**
 * Get unit by idUnit
 * @returns {Promise<Unit | null>}
 */
export async function getUnitById(idUnit: number): Promise<Unit | null> {
  return await prisma.unit.findUnique({
    where: {
      idUnit: idUnit,
    },
  });
}

/**
 * Updates unit
 * @param idUnit Unit id
 * @param name Unit name
 * @returns {Promise<Unit>}
 */
export async function updateUnit(idUnit: number, name: string): Promise<Unit> {
  return await prisma.unit.update({
    where: {
      idUnit: idUnit,
    },
    data: {
      name: name,
    },
  });
}

/**
 * Deletes unit
 * @param idUnit Unit id
 */
export async function deleteUnit(idUnit: number) {
  await prisma.unit.delete({
    where: {
      idUnit: idUnit,
    },
  });
}

/**
 * Get all unit groups
 * @returns {Promise<UnitGroup>}
 */
export async function getAllUnitGroups(): Promise<UnitGroup[]> {
  return await prisma.unitGroup.findMany({
    cacheStrategy: {
      ttl: 3600,
      swr: 1200,
      tags: ["all_unit_groups"],
    },
  });
}

/**
 * Inserts unit group
 * @param name Unit name
 * @returns {Promise<UnitGroup>}
 */
export async function insertUnitGroup(name: string): Promise<UnitGroup> {
  return await prisma.unitGroup.create({
    data: {
      name: name,
    },
  });
}

/**
 * Get unit group by name
 * @param name Unit group name
 * @returns {Promise<UnitGroup | null>}
 */
export async function getUnitGroupByName(
  name: string
): Promise<UnitGroup | null> {
  return await prisma.unitGroup.findUnique({
    where: {
      name: name,
    },
  });
}

/**
 * Get unit group by idUnitGroup
 * @returns {Promise<UnitGroup | null>}
 */
export async function getUnitGroupById(
  idUnitGroup: number
): Promise<UnitGroup | null> {
  return await prisma.unitGroup.findUnique({
    where: {
      idUnitGroup: idUnitGroup,
    },
  });
}

/**
 * Updates unit group
 * @param idUnitGroup Unit group id
 * @param name Unit group name
 * @returns {Promise<UnitGroup>}
 */
export async function updateUnitGroup(
  idUnitGroup: number,
  name: string
): Promise<UnitGroup> {
  return await prisma.unitGroup.update({
    where: {
      idUnitGroup: idUnitGroup,
    },
    data: {
      name: name,
    },
  });
}

/**
 * Deletes unit group
 * @param idUnitGroup Unit group id
 */
export async function deleteUnitGroup(idUnitGroup: number) {
  await prisma.unitGroup.delete({
    where: {
      idUnitGroup: idUnitGroup,
    },
  });
}

/**
 * Retrieves all unit groups with assignment information for a specific unit.
 *
 * Each unit group includes:
 * - group ID and name,
 * - base unit info (name),
 * - assignment info for the given unit via `unitGroupUnit` (if assigned),
 *   including whether the unit is base unit in that group.
 *
 * @param idUnit - ID of the unit to filter assignments by.
 * @returns A list of UnitGroups with assignment info filtered to the given unit.
 */
export async function getAllUnitGroupsWithAssignments(
  idUnit: number
): Promise<UnitGroupsWithAssignmentsDTO[]> {
  return prisma.unitGroup.findMany({
    relationLoadStrategy: "join",
    select: {
      idUnitGroup: true,
      name: true,
      unitGroupUnit: {
        where: {
          idUnit,
        },
        select: {
          isBaseUnit: true,
          idUnit: true,
        },
      },
    },
  });
}

/**
 * Retrieves all unit groups from the database along with their related details.
 *
 * For each unit group, the function includes:
 * - the group's ID and name,
 * - the name of its base unit (if assigned),
 * - a list of all units assigned to the group (with their IDs and names).
 *
 * This data is typically used for displaying detailed unit group information in the UI.
 *
 * @returns A list of UnitGroupWithDetailDTO objects representing unit groups with their base unit
 *          and assigned units.
 */
export async function getAllUnitGroupsWithDetails(): Promise<
  PaginatedDTO<UnitGroupWithDetailDTO>
> {
  const [items, totalCount] = await Promise.all([
    prisma.unitGroup.findMany({
      relationLoadStrategy: "join",
      select: {
        idUnitGroup: true,
        name: true,
        unitGroupUnit: {
          select: {
            isBaseUnit: true,
            unit: {
              select: {
                idUnit: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.unitGroup.count(),
  ]);

  return { items, totalCount };
}

/**
 * Retrieves all units from the database along with their group assignments.
 *
 * For each unit, includes:
 * - unit ID and name,
 * - an array of assigned groups (id and name),
 * - an indication if the unit is base unit in each group.
 *
 * Returns data in paginated format using `PaginatedDTO`.
 *
 * @returns A paginated list of units with their group assignments.
 */
export async function getAllUnitsWithGroupInfo(): Promise<
  PaginatedDTO<UnitWithGroupInfoDTO>
> {
  const [items, totalCount] = await Promise.all([
    prisma.unit.findMany({
      relationLoadStrategy: "join",
      select: {
        idUnit: true,
        name: true,
        unitGroupUnit: {
          select: {
            idUnitGroup: true,
            isBaseUnit: true,
            unitGroup: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.unit.count(),
  ]);

  return { items, totalCount };
}

/**
 * Assigns a unit to a unit group and optionally marks it as the base unit within that group.
 *
 * - Always removes the unit from any existing group assignments (1 unit = 1 group).
 * - If `isBaseUnit` is true, ensures there is no other base unit in the same group.
 *   If a base unit exists, it is unset and the new one is assigned.
 * - If `idUnitGroup` is null, the unit will be removed from all groups.
 *
 * @param idUnit - ID of the unit to assign or unassign.
 * @param isBaseUnit - true = set as base unit, false = regular unit, null = ignore base status.
 * @param idUnitGroup - ID of the group to assign the unit to. If null, the unit will be removed from all groups.
 *
 * @returns Promise<void>
 */
export async function addUnitToGroup(
  idUnit: number,
  isBaseUnit: boolean | null,
  idUnitGroup: number | null
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // If no group is provided, stop here (unit was unassigned)
    if (idUnitGroup == null) return;

    // If setting this unit as the base unit, unset the current base unit of the group
    if (isBaseUnit) {
      await tx.unitGroupUnit.updateMany({
        where: {
          idUnitGroup,
          isBaseUnit: true,
        },
        data: {
          isBaseUnit: false,
        },
      });
    }

    // Create a new assignment of the unit to the group with the appropriate base flag
    await tx.unitGroupUnit.create({
      data: {
        idUnit,
        idUnitGroup,
        isBaseUnit: isBaseUnit ?? false,
      },
    });
  });
}
