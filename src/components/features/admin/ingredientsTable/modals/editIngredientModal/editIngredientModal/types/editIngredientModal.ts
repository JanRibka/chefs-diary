import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

export interface EditIngredientModalProps {
  ingredient: IngredientWithAssignedGroupDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  setIngredientToEdit: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  refetch: () => void;
}
