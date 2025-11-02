import { useCallback, useState, useTransition } from "react";

import { updateIngredientAction } from "@/actions/admin/ingredients";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import {
  IngredientFormErrorType,
  IngredientFormType,
} from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

import { EditIngredientModalProps } from "../types/editIngredientModal";

type UseEditIngredientReturn = {
  isPending: boolean;
  error: IngredientFormErrorType;
  handleSubmit: () => void;
  handleClose: () => void;
  handleEditIngredientAction: (formData: FormData) => Promise<void>;
};

/**
 * useEditIngredient - Hook for managing ingredient editing state and actions
 *
 * @param params - Hook parameters
 * @param params.ingredient - The ingredient being edited
 * @param params.setOptimisticIngredient - Function to set optimistic update
 * @param params.setIngredientToEdit - Function to set ingredient to edit
 * @param params.refetch - Function to refetch data
 * @param params.onOpenChange - Function to handle modal open/close
 * @returns Hook return object with state and handlers
 */
export const useEditIngredient = ({
  ingredient,
  setOptimisticIngredient,
  setIngredientToEdit,
  refetch,
  onOpenChange,
}: Pick<
  EditIngredientModalProps,
  | "ingredient"
  | "setOptimisticIngredient"
  | "setIngredientToEdit"
  | "refetch"
  | "onOpenChange"
>): UseEditIngredientReturn => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<IngredientFormErrorType>({});

  const handleSubmit = useCallback(() => {
    // Validation logic can be added here if needed
  }, []);

  const handleClose = useCallback(() => {
    setIngredientToEdit(null);
    setError({});
    onOpenChange();
  }, [setIngredientToEdit, onOpenChange]);

  const handleEditIngredientAction = useCallback(
    async (formData: FormData) => {
      setOptimisticIngredient({
        idIngredient: ingredient.idIngredient,
        name: formData.get(nameof<IngredientFormType>("name")) as string,
        group: ingredient.group,
      });

      startTransition(async () => {
        try {
          const ingredientResult = await updateIngredientAction(
            ingredient.idIngredient,
            formData
          );

          if (!ingredientResult.success) {
            if (typeof ingredientResult.error === "object") {
              setError(ingredientResult.error);
              return;
            }

            addToast("Chyba", ingredientResult.error as string, "danger");
          } else {
            addToast("Úspěch", "Ingredience byla úspěšně upravena", "success");
            refetch();
            onOpenChange();
          }
        } catch {
          addToast(
            "Chyba",
            "Neočekávaná chyba při úpravě ingredience",
            "danger"
          );
          setError({ general: "Neočekávaná chyba" });
        }
      });
    },
    [ingredient, setOptimisticIngredient, refetch, onOpenChange]
  );

  return {
    isPending,
    error,
    handleSubmit,
    handleClose,
    handleEditIngredientAction,
  };
};
