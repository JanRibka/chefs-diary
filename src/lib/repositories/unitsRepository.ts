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
 * Retrieves all unit groups from the database along with their assignment status
 * for a specific unit (if assigned).
 *
 * Each unit group includes related assignment data (`unitGroupUnit`) only for the given unit.
 * This is useful for determining which groups the unit belongs to and whether it is a base unit in any of them.
 *
 * @returns A list of UnitGroup entities with filtered `unitGroupUnit` relations related to the given unit.
 */
export async function getAllUnitGroupsWithAssignments(): Promise<
  UnitGroupsWithAssignmentsDTO[]
> {
  return await prisma.unitGroup.findMany({
    relationLoadStrategy: "join",
    include: {
      baseUnit: {
        select: {
          name: true,
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
        baseUnit: {
          select: {
            name: true,
          },
        },
        unit: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.unitGroup.count(),
  ]);

  return { items, totalCount };
}

/**
 * Retrieves all units from the database along with related group information.
 *
 * For each unit, the function includes:
 * - the unit's ID and name,
 * - the name of the group to which the unit belongs (if any),
 * - the group's base unit ID to determine if the unit is the base unit.
 *
 * Returns the data in a paginated format using `PaginatedDTO`.
 *
 * @returns A paginated list of units with associated group info.
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
        unitGroup: {
          select: {
            name: true,
            idBaseUnit: true,
          },
        },
      },
    }),
    prisma.unit.count(),
  ]);

  return { items, totalCount };
}
