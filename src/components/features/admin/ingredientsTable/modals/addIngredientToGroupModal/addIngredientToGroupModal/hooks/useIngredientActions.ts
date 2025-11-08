import { useCallback, useTransition } from "react";

import {
  addIngredientToGroupAction,
  removeIngredientFromGroupAction,
} from "@/actions/admin/ingredients";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import addToast from "@/lib/utils/addToast";

interface UseIngredientActionsParams {
  ingredient: IngredientWithAssignedGroupDTO | null;
  onSuccess: () => void;
  refetch: () => void;
}

interface UseIngredientActionsReturn {
  isPending: boolean;
  handleAddIngredient: (formData: FormData) => Promise<void>;
  handleRemoveIngredient: () => Promise<void>;
}

export function useIngredientActions({
  ingredient,
  onSuccess,
  refetch,
}: UseIngredientActionsParams): UseIngredientActionsReturn {
  const [isPending, startTransition] = useTransition();

  const handleAddIngredient = useCallback(
    async (formData: FormData) => {
      if (!ingredient) return;

      startTransition(async () => {
        const response = await addIngredientToGroupAction(
          ingredient.idIngredient,
          formData
        );

        if (!response.success) {
          addToast("Chyba", response.error as string, "danger");
          return;
        }

        addToast(
          "Úspěch",
          "Ingredience byla úspěšně přiřazena do skupiny",
          "success"
        );
        refetch();
        onSuccess();
      });
    },
    [ingredient, onSuccess, refetch]
  );

  const handleRemoveIngredient = useCallback(async () => {
    if (!ingredient) return;

    startTransition(async () => {
      const response = await removeIngredientFromGroupAction(
        ingredient.idIngredient
      );

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
        return;
      }

      addToast(
        "Úspěch",
        "Ingredience byla úspěšně odebrána ze skupiny",
        "success"
      );
      refetch();
      onSuccess();
    });
  }, [ingredient, onSuccess, refetch]);

  return {
    isPending,
    handleAddIngredient,
    handleRemoveIngredient,
  };
}
