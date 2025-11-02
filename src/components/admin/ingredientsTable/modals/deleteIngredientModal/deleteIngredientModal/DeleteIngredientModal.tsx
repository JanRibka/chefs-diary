import { memo } from "react";

import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";

import DeleteIngredientModalContent from "../deleteIngredientModalContent/DeleteIngredientModalContent";
import { useDeleteIngredient } from "./hooks/useDeleteIngredient";
import { DeleteIngredientModalProps } from "./types/deleteIngredientModal";

const DeleteIngredientModal = memo<DeleteIngredientModalProps>(
  ({
    ingredient,
    isOpen,
    onOpenChange,
    setOptimisticIngredient,
    setIngredientToDelete,
    refetch,
  }) => {
    const { isPending, handleDeleteAction, handleClose } = useDeleteIngredient({
      ingredient,
      setOptimisticIngredient,
      setIngredientToDelete,
      refetch,
      onOpenChange,
    });

    return (
      <CancelConfirmModal
        isOpen={isOpen}
        placement="center"
        onOpenChange={handleClose}
        headerLabel="Smazat skupinu jednotek"
        hideFooter
        isDismissable={false}
      >
        <DeleteIngredientModalContent
          ingredient={ingredient}
          onCancel={handleClose}
          action={handleDeleteAction}
          isPending={isPending}
        />
      </CancelConfirmModal>
    );
  }
);

DeleteIngredientModal.displayName = "DeleteIngredientModal";

export default DeleteIngredientModal;
