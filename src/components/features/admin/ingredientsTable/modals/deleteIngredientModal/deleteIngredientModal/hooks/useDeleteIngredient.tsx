import { useCallback, useState, useTransition } from "react";

import { deleteIngredientAction } from "@/actions/admin/ingredients";
import addToast from "@/lib/utils/addToast";

import { DeleteIngredientModalProps } from "../types/deleteIngredientModal";

type UseDeleteIngredientReturn = {
  isPending: boolean;
  error: string | null;
  handleDelete: () => Promise<void>;
  handleDeleteAction: (formData: FormData) => Promise<void>;
  handleClose: () => void;
};

/**
 * Custom hook for managing ingredient deletion logic.
 * Handles optimistic updates, server action calls, and error handling.
 *
 * @param params - Hook parameters including ingredient data and callbacks
 * @returns Object containing loading state, error state, and handler functions
 */
export const useDeleteIngredient = ({
  ingredient,
  setOptimisticIngredient,
  setIngredientToDelete,
  refetch,
  onOpenChange,
}: Pick<
  DeleteIngredientModalProps,
  | "ingredient"
  | "setOptimisticIngredient"
  | "setIngredientToDelete"
  | "refetch"
  | "onOpenChange"
>): UseDeleteIngredientReturn => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(async () => {
    setError(null); // Clear previous errors
    setOptimisticIngredient({
      ...ingredient,
    });

    startTransition(async () => {
      try {
        const result = await deleteIngredientAction(ingredient.idIngredient);

        if (!result.success) {
          const errorMessage = result.error as string;
          setError(errorMessage);
          addToast("Chyba", errorMessage, "danger");
          return;
        }

        addToast("Úspěch", "Ingredience byla úspěšně smazána", "success");
        refetch();
        onOpenChange();
      } catch {
        const errorMessage = "Došlo k neočekávané chybě";
        setError(errorMessage);
        addToast("Chyba", errorMessage, "danger");
      }
    });
  }, [ingredient, setOptimisticIngredient, refetch, onOpenChange]);

  const handleDeleteAction = useCallback(
    async (formData: FormData) => {
      void formData;
      await handleDelete();
    },
    [handleDelete]
  );

  const handleClose = useCallback(() => {
    setIngredientToDelete(null);
    onOpenChange();
  }, [setIngredientToDelete, onOpenChange]);

  return {
    isPending,
    error,
    handleDelete,
    handleDeleteAction,
    handleClose,
  };
};
