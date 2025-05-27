import { Unit } from "@prisma/client";

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

  return { data: units, totalCount, page, pageSize };
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
      idUnitGroup: 1, //TODO: Nacitat z parametru
    },
  });
}
