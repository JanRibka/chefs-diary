import { Ingredient, IngredientGroup } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";
import { IngredientGroupsWithAssignmentsDTO } from "../dTOs/admin/IngredientGroupsWithAssignmentsDTO";
import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { IngredientWithAssignedGroupRawDTO } from "../dTOs/admin/IngredientWithAssignedGroupRawDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import { createRecord, findByNameCaseInsensitive } from "../utils/prisma";

/**
 * Retrieves all ingredient groups with their assigned ingredients.
 *
 * Returns paginated results for displaying in data tables or management interfaces.
 *
 * @returns Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
 *          A paginated response with ingredient groups and their ingredients.
 */
export async function getIngredientUnitGroupWithAssignedIngredients(): Promise<
  PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>
> {
  const [items, totalCount] = await Promise.all([
    prisma.ingredientGroup.findMany({
      relationLoadStrategy: "join",
      select: {
        idIngredientGroup: true,
        name: true,
        ingredient: {
          select: {
            idIngredient: true,
            name: true,
          },
        },
      },
    }),
    prisma.ingredientGroup.count(),
  ]);

  return { items, totalCount };
}

/**
 * Retrieves an ingredient group by name (case-insensitive).
 *
 * Used for validation or lookup. Returns null if not found.
 *
 * @param name - The name of the ingredient group to search for.
 * @returns Promise<IngredientGroup | null> - The ingredient group or null.
 */
export async function getIngredientGroupByName(
  name: string
): Promise<IngredientGroup | null> {
  return findByNameCaseInsensitive<IngredientGroup>(
    prisma.ingredientGroup,
    name
  );
}

/**
 * Retrieves a specific ingredient group from the database by its ID.
 *
 * - Searches for an ingredient group with the exact ID match.
 * - Returns the complete ingredient group record if found.
 * - Typically used for retrieving group details when the ID is known.
 *
 * @param idIngredientGroup - The unique identifier of the ingredient group.
 *
 * @returns Promise<IngredientGroup | null> - The ingredient group if found, otherwise null.
 */
export async function getIngredientGroupById(
  idIngredientGroup: number
): Promise<IngredientGroup | null> {
  return await prisma.ingredientGroup.findUnique({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
  });
}

/**
 * Creates a new ingredient group with the specified name.
 *
 * Used for adding new categories like "Vegetables" or "Spices".
 *
 * @param name - The name of the new ingredient group.
 * @returns Promise<IngredientGroup> - The created ingredient group.
 */
export async function insertIngredientGroup(
  name: string
): Promise<IngredientGroup> {
  return createRecord<IngredientGroup>(prisma.ingredientGroup, { name });
}

/**
 * Updates an ingredient group's name by ID.
 *
 * Preserves all other properties and relationships.
 *
 * @param idIngredientGroup - The ID of the ingredient group to update.
 * @param name - The new name for the ingredient group.
 * @returns Promise<void>
 */
export async function updateIngredientGroup(
  idIngredientGroup: number,
  name: string
): Promise<void> {
  await prisma.ingredientGroup.update({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
    data: {
      name: name,
    },
  });
}

/**
 * Deletes an ingredient group from the database by its ID.
 *
 * - Removes the ingredient group and all its associations.
 * - Use with caution, as this operation is irreversible.
 * - Typically used for removing unused or obsolete ingredient categories.
 *
 * @param idIngredientGroup - The unique identifier of the ingredient group to delete.
 *
 * @returns Promise<void>
 */
export async function deleteIngredientGroup(
  idIngredientGroup: number
): Promise<void> {
  await prisma.ingredientGroup.delete({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
  });
}

/**
 * Retrieves all ingredients with their assigned groups.
 *
 * Returns paginated results for displaying in data tables.
 *
 * @returns Promise<PaginatedDTO<IngredientWithAssignedGroupRawDTO>> - Paginated ingredients with groups.
 */
export async function getIngredientsWithAssignedGroups(): Promise<
  PaginatedDTO<IngredientWithAssignedGroupRawDTO>
> {
  const [items, totalCount] = await Promise.all([
    prisma.ingredient.findMany({
      relationLoadStrategy: "join",
      select: {
        idIngredient: true,
        name: true,
        group: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.ingredient.count(),
  ]);

  return { items, totalCount };
}

/**
 * Retrieves an ingredient by name (case-insensitive).
 *
 * Used for validation or lookup. Returns null if not found.
 *
 * @param name - The name of the ingredient to search for.
 * @returns Promise<Ingredient | null> - The ingredient or null.
 */
export async function getIngredientByName(
  name: string
): Promise<Ingredient | null> {
  return findByNameCaseInsensitive<Ingredient>(prisma.ingredient, name);
}

/**
 * Creates a new ingredient group with the specified name.
 *
 * Used for adding new categories like "Vegetables" or "Spices".
 *
 * @param name - The name of the new ingredient group.
 * @returns Promise<IngredientGroup> - The created ingredient group.
 */
export async function insertIngredient(name: string): Promise<Ingredient> {
  return createRecord<Ingredient>(prisma.ingredient, { name });
}

/**
 * Retrieves a specific ingredient from the database by its ID.
 *
 * - Searches for an ingredient with the exact ID match.
 * - Returns the complete ingredient record if found.
 * - Typically used for retrieving ingredient details when the ID is known.
 *
 * @param idIngredient - The unique identifier of the ingredient.
 *
 * @returns Promise<Ingredient | null> - The ingredient if found, otherwise null.
 */
export async function getIngredientById(
  idIngredient: number
): Promise<Ingredient | null> {
  return await prisma.ingredient.findUnique({
    where: {
      idIngredient: idIngredient,
    },
  });
}

/**
 * Deletes an ingredient from the database by its ID.
 *
 * - Removes the ingredient and all its associations.
 * - Use with caution, as this operation is irreversible.
 * - Typically used for removing unused or obsolete ingredients.
 *
 * @param idIngredient - The unique identifier of the ingredient to delete.
 *
 * @returns Promise<void>
 */
export async function deleteIngredient(idIngredient: number): Promise<void> {
  await prisma.ingredient.delete({
    where: {
      idIngredient: idIngredient,
    },
  });
}

/**
 * Updates an ingredient's name by ID.
 *
 * Preserves all other properties and relationships.
 *
 * @param idIngredient - The ID of the ingredient to update.
 * @param name - The new name for the ingredient.
 * @returns Promise<void>
 */
export async function updateIngredient(
  idIngredient: number,
  name: string
): Promise<void> {
  await prisma.ingredient.update({
    where: {
      idIngredient: idIngredient,
    },
    data: {
      name: name,
    },
  });
}

/**
 * Assigns an ingredient to an ingredient group.
 *
 * @param idIngredient - The ID of the ingredient to assign.
 * @param idIngredientGroup - The ID of the ingredient group to assign to, or null to unassign.
 * @returns Promise<void>
 */
export async function assignIngredientToGroup(
  idIngredient: number,
  idIngredientGroup: number | null
): Promise<void> {
  await prisma.ingredient.update({
    where: {
      idIngredient: idIngredient,
    },
    data: {
      idIngredientGroup: idIngredientGroup,
    },
  });
}

/**
 * Retrieves all ingredient groups with information about whether a specific ingredient is assigned to them.
 *
 * @param idIngredient - The ID of the ingredient to check assignments for.
 * @returns Promise<IngredientGroupsWithAssignmentsDTO[]> - List of ingredient groups with assignment info.
 */
export async function getIngredientGroupsWithAssignedIngredients(
  idIngredient: number
): Promise<IngredientGroupsWithAssignmentsDTO[]> {
  return await prisma.ingredientGroup.findMany({
    relationLoadStrategy: "join",
    select: {
      idIngredientGroup: true,
      name: true,
      ingredient: {
        where: {
          idIngredient,
        },
        select: {
          idIngredient: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Ingredient repository object containing all ingredient and ingredient group operations.
 *
 * Provides a centralized interface for database operations related to ingredients and their groups.
 * All operations are async and return appropriate data types or void for mutations.
 */
export const ingredientRepository = {
  getIngredientUnitGroupWithAssignedIngredients,
  getIngredientGroupByName,
  getIngredientGroupById,
  insertIngredientGroup,
  updateIngredientGroup,
  deleteIngredientGroup,
  getIngredientsWithAssignedGroups,
  getIngredientGroupsWithAssignedIngredients,
  getIngredientByName,
  insertIngredient,
  getIngredientById,
  deleteIngredient,
  updateIngredient,
  assignIngredientToGroup,
} as const;
