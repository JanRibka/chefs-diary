import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import { ingredientRepository } from "./ingredientRepository";

/**
 * Retrieves all ingredient groups with their assigned ingredients.
 *
 * @returns {Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>}
 *          Paginated list of ingredient groups with assigned ingredients and total count.
 */
export async function getIngredientUnitGroupWithAssignedIngredients(): Promise<
  PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>
> {
  return await ingredientRepository.getIngredientUnitGroupWithAssignedIngredients();
}

export const ingredientService = {
  getIngredientUnitGroupWithAssignedIngredients,
} as const;
