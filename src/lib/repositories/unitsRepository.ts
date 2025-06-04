import { Unit, UnitGroup } from '@prisma/client';

import { prisma } from '../../config/prisma/prisma';
import { UnitGroupsWithAssignmentsDTO } from '../dTOs/admin/UnitGroupsWithAssignmentsDTO';
import { PaginatedDTO } from '../dTOs/shared/PaginatedDTO';

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

/**
 * Retrieves all unit groups from the database along with their assignment status
 * for a specific unit (if assigned).
 *
 * Each unit group includes related assignment data (`unitGroupUnit`) only for the given unit.
 * This is useful for determining which groups the unit belongs to and whether it is a base unit in any of them.
 *
 * @param idUnit - The ID of the unit for which to check group assignments.
 * @returns A list of UnitGroup entities with filtered `unitGroupUnit` relations related to the given unit.
 */
export async function getAllUnitGroupsWithAssignments(
  idUnit: number
): Promise<UnitGroupsWithAssignmentsDTO[]> {
  return await prisma.unitGroup.findMany({
    relationLoadStrategy: "join",
    include: {
      unitGroupUnit: {
        where: {
          idUnit: idUnit,
        },
        select: {
          idUnitGroup: true,
          isBaseUnit: true,
        },
      },
    },
  });
}

Na základě tebou definovaných Prisma modelů Unit a UnitGroup níže uvádím dvě přesné Prisma dotazy, které odpovídají tvému zadání.

🔍 1. Dotaz: Získat všechny skupiny, včetně:
názvu skupiny (name)

názvu jejich base unit

všech jednotek, které do dané skupiny patří

ts
Zkopírovat
Upravit
const unitGroupsWithDetails = await prisma.unitGroup.findMany({
  include: {
    baseUnit: {
      select: {
        name: true,
      },
    },
    unit: {
      select: {
        idUnit: true,
        name: true,
      },
    },
  },
});
// ✅ Výstupová struktura:
// Každá skupina bude mít např.:

// ts
// Zkopírovat
// Upravit
// {
//   idUnitGroup: 1,
//   name: "Volume",
//   baseUnit: {
//     name: "ml"
//   },
//   unit: [
//     { idUnit: 1, name: "ml" },
//     { idUnit: 2, name: "l" }
//   ]
// }
// 🔍 2. Dotaz: Získat všechny jednotky, včetně:
// zda je jednotka baseUnit (true/false)

// název skupiny, ke které patří

// ts
// Zkopírovat
// Upravit
// const unitsWithGroupInfo = await prisma.unit.findMany({
//   select: {
//     idUnit: true,
//     name: true,
//     unitGroup: {
//       select: {
//         name: true,
//         idBaseUnit: true,
//       },
//     },
//   },
// });
// ➕ Vylepšení – výpočet isBaseUnit:
// Pokud chceš rovnou získat isBaseUnit: true/false, můžeš dotaz transformovat po načtení:

// ts
// Zkopírovat
// Upravit
// const units = await prisma.unit.findMany({
//   select: {
//     idUnit: true,
//     name: true,
//     unitGroup: {
//       select: {
//         name: true,
//         idBaseUnit: true,
//       },
//     },
//   },
// });

// const result = units.map((unit) => ({
//   idUnit: unit.idUnit,
//   name: unit.name,
//   groupName: unit.unitGroup?.name ?? null,
//   isBaseUnit: unit.unitGroup?.idBaseUnit === unit.idUnit,
// }));
// ✅ Výstupová struktura:
// ts
// Zkopírovat
// Upravit
// {
//   idUnit: 2,
//   name: "l",
//   groupName: "Volume",
//   isBaseUnit: false
// }
