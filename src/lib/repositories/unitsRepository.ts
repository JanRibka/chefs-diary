import { Unit, UnitGroup } from "@prisma/client";

import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import { prisma } from "../prisma";

/**
 * Get all units cached
 * @returns {Promise<Unit[]>}
 */
export async function getAllUnitsCached(): Promise<Unit[]> {
  return await prisma.unit.findMany({
    cacheStrategy: {
      ttl: 3600,
      swr: 1200,
      tags: ["all_units"],
    },
  });
}

/**
 * Get all units
 * @returns {Promise<PaginatedDTO<Unit>>}
 */
export async function getAllUnits(): Promise<PaginatedDTO<Unit>> {
  const [units, totalCount] = await Promise.all([
    prisma.unit.findMany({}),

    prisma.unit.count(),
  ]);

  return { items: units, totalCount };
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
 * @returns {Promise<PaginatedDTO<UnitGroup>>}
 */
export async function getAllUnitGroups(): Promise<PaginatedDTO<UnitGroup>> {
  const [unitGroups, totalCount] = await Promise.all([
    prisma.unitGroup.findMany({}),
    prisma.unitGroup.count(),
  ]);

  return { items: unitGroups, totalCount };
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
