import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

export interface EditIngredientModalContentProps {
  ingredient: IngredientWithAssignedGroupDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientFormErrorType;
  isPending?: boolean;
}
