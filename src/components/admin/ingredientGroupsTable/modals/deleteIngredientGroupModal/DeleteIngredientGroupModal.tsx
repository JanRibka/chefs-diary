import { Dispatch, SetStateAction, useTransition } from "react";

import { deleteIngredientGroupAction } from "@/actions/admin/ingredients";
import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import addToast from "@/lib/utils/addToast";

import { SetOptimisticIngredientGroupType } from "../../IngredientGroupsTable";
import DeleteIngredientGroupModalContent from "./DeleteIngredientGroupModalContent";

type Props = {
  group: IngredientGroupWithAssignedIngredientsDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  setGroupToDelete: Dispatch<
    SetStateAction<IngredientGroupWithAssignedIngredientsDTO | null>
  >;
  refetch: () => void;
};

export default function DeleteIngredientGroupModal({
  group,
  isOpen,
  onOpenChange,
  setOptimisticIngredientGroup,
  setGroupToDelete,
  refetch,
}: Props) {
  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleDeleteIngredientGroupAction = async () => {
    setOptimisticIngredientGroup({
      type: "delete",
      ingredientGroup: {
        ...group,
      },
    });

    startTransition(async () => {
      const ingredientGroup = await deleteIngredientGroupAction(
        group.idIngredientGroup
      );

      if (!ingredientGroup.success) {
        addToast("Chyba", ingredientGroup.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně smazána", "success");

        refetch();
        onOpenChange();
      }
    });
  };

  // Handlers
  const handleCloseDeleteGroup = () => {
    setGroupToDelete(null);
    onOpenChange();
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseDeleteGroup}
      headerLabel="Smazat skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <DeleteIngredientGroupModalContent
        group={group}
        onCancel={handleCloseDeleteGroup}
        action={handleDeleteIngredientGroupAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
