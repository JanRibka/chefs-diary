import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

import { SetOptimisticIngredient } from "./useIngredientsTableState";

export default function useIngredientOptimistic(
  setOptimisticIngredient: (action: SetOptimisticIngredient) => void
) {
  return {
    insertIngredient: (ingredient: IngredientWithAssignedGroupDTO) =>
      setOptimisticIngredient({ type: "add", ingredient }),
    editIngredient: (ingredient: IngredientWithAssignedGroupDTO) =>
      setOptimisticIngredient({ type: "update", ingredient }),
    deleteIngredient: (ingredient: IngredientWithAssignedGroupDTO) =>
      setOptimisticIngredient({ type: "delete", ingredient }),
  };
}
