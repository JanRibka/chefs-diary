import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

export interface InsertIngredientModalContentProps {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientFormErrorType;
  isPending?: boolean;
}
