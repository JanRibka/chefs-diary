import { prisma } from "../../config/prisma/prisma";
import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";

/**
 * Retrieves all ingredient groups from the database along with their assigned ingredients.
 *
 * For each ingredient group, the function includes:
 * - the group's ID and name,
 * - a list of all ingredients assigned to the group (with their IDs and names).
 *
 * The function returns paginated results with the total count of ingredient groups.
 * This data is typically used for displaying ingredient group information with
 * their associated ingredients in data tables or management interfaces.
 *
 * @returns {Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>}
 *          A paginated response containing:
 *          - items: Array of ingredient groups with their assigned ingredients
 *          - totalCount: Total number of ingredient groups in the database
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

export const ingredientRepository = {
  getIngredientUnitGroupWithAssignedIngredients,
};
