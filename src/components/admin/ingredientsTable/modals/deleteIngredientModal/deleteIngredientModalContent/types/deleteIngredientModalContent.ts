import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

export interface DeleteIngredientModalContentProps {
  ingredient: IngredientWithAssignedGroupDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
}
