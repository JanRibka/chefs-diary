import { useTransition } from "react";

import { insertIngredientGroupAction } from "@/actions/admin/ingredients";
import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { IngredientGroupFormType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

import { SetOptimisticIngredientGroupType } from "../../IngredientGroupsTable";
import InsertIngredientGroupModalContent from "./insertIngredientGroupModalContent/InsertIngredientGroupModalContent";
import useInsertIngredientGroupValidation from "./useInsertIngredientGroupValidation";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  refetch: () => void;
};

export default function InsertIngredientGroupModal({
  isOpen,
  onOpenChange,
  setOptimisticIngredientGroup,
  refetch,
}: Props) {
  // Validations
  const { error, setError, validate } = useInsertIngredientGroupValidation();

  // Handlers
  const handleSubmitInsertGroup = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseInsertGroup = () => {
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleInsertIngredientGroupAction = async (formData: FormData) => {
    setOptimisticIngredientGroup({
      type: "add",
      ingredientGroup: {
        idIngredientGroup: Math.random(),
        name: formData.get(nameof<IngredientGroupFormType>("name")) as string,
        ingredient: [],
      },
    });

    startTransition(async () => {
      const ingredientGroup = await insertIngredientGroupAction(formData);

      if (!ingredientGroup.success) {
        if (typeof ingredientGroup.error === "object") {
          setError(ingredientGroup.error);
          return;
        }

        addToast("Chyba", ingredientGroup.error as string, "danger");
      } else {
        addToast(
          "Úspěch",
          "Skupina ingrediencí byla úspěšně přidána",
          "success"
        );
        refetch();
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseInsertGroup}
      headerLabel="Přidat skupinu ingrediencí"
      hideFooter
      isDismissable={false}
    >
      <InsertIngredientGroupModalContent
        onCancel={handleCloseInsertGroup}
        action={handleInsertIngredientGroupAction}
        onSubmit={handleSubmitInsertGroup}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
