import { TransitionStartFunction } from "react";

import { insertIngredientAction } from "@/actions/admin/ingredients";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { IngredientFormType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

import useInsertIngredientValidation from "./useInsertIngredientValidation";

interface UseInsertIngredientModalProps {
  onOpenChange: () => void;
  setOptimisticIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  refetch: () => void;
  startTransition: TransitionStartFunction;
}

export function useInsertIngredientModal({
  onOpenChange,
  setOptimisticIngredient,
  refetch,
  startTransition,
}: UseInsertIngredientModalProps) {
  const { error, setError, validate } = useInsertIngredientValidation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleClose = () => {
    setError({});
    onOpenChange();
  };

  const handleInsertAction = async (formData: FormData) => {
    setOptimisticIngredient({
      idIngredient: Math.random(),
      name: formData.get(nameof<IngredientFormType>("name")) as string,
      groupName: null,
    });

    startTransition(async () => {
      try {
        const result = await insertIngredientAction(formData);

        if (!result.success) {
          if (typeof result.error === "object") {
            setError(result.error);
            return;
          }

          addToast("Chyba", result.error as string, "danger");
          return;
        }

        addToast(
          "Úspěch",
          "Skupina ingrediencí byla úspěšně přidána",
          "success"
        );
        refetch();
        onOpenChange();
      } catch (error) {
        addToast("Chyba", "Došlo k neočekávané chybě", "danger");
        console.error("Insert ingredient error:", error);
      }
    });
  };

  return {
    error,
    handleSubmit,
    handleClose,
    handleInsertAction,
  };
}
