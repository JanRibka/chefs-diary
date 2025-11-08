import { IngredientGroupModalDTO } from "@/lib/dTOs/admin/IngredientGroupModalDTO";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

// Modal content
export interface IngredientGroupModalProps {
  ingredient: IngredientWithAssignedGroupDTO;
  onCancel: () => void;
  saveAction: (formData: FormData) => Promise<void>;
  removeAction: () => Promise<void>;
  isPending?: boolean;
}

export interface GroupSelectionProps {
  ingredient: IngredientWithAssignedGroupDTO;
  groupData: IngredientGroupModalDTO[];
  selectedGroupIds: string[];
  onGroupChange: (selectedIds: string[]) => void;
}

export interface ActionButtonsProps {
  isPending: boolean;
  selectedGroupIds: string[];
  onCancel: () => void;
  onRemove: () => void;
}
