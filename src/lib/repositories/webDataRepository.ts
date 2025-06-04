import { Unit, UnitGroup } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";

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
 * Get all units paginated
 * @param page Page number
 * @param pageSize Page size
 * @param orderByField Order by field
 * @param orderDirection Order by direction
 * @returns {Promise<PaginatedDTO<Unit>>}
 */
export async function getAllUnitsPaginated(
  page: number,
  pageSize: number,
  orderByField?: string,
  orderDirection?: string
): Promise<PaginatedDTO<Unit>> {
  const skip = (page - 1) * pageSize;

  const orderBy =
    orderByField && orderDirection
      ? {
          [orderByField]: orderDirection,
        }
      : undefined;

  const [units, totalCount] = await Promise.all([
    prisma.unit.findMany({
      skip,
      take: pageSize,
      orderBy,
    }),

    prisma.unit.count(),
  ]);

  return { items: units, totalCount };
}

/**
 * Inserts unit
 * @param name Unit name
 * @param displayName Unit display name
 * @returns {Promise<Unit>}
 */
export async function insertUnit(
  name: string,
  displayName: string
): Promise<Unit> {
  return await prisma.unit.create({
    data: {
      name: name,
      displayName: displayName,
    },
  });
}

/**
 * Get all unit groups
 * @returns {ServiceResponseDTO<PaginatedDTO<UnitGroup>>}
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
