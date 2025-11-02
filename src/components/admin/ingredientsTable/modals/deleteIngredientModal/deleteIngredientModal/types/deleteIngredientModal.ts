import { Dispatch, SetStateAction } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

export interface DeleteIngredientModalProps {
  ingredient: IngredientWithAssignedGroupDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  setIngredientToDelete: Dispatch<
    SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  refetch: () => void;
}
