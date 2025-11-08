import { memo } from "react";

import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";

import EditIngredientModalContent from "../editIngredientModalContent/EditIngredientModalContent";
import { useEditIngredient } from "./hooks/useEditIngredient";
import { EditIngredientModalProps } from "./types/editIngredientModal";

const EditIngredientModal = memo<EditIngredientModalProps>(
  ({
    ingredient,
    isOpen,
    onOpenChange,
    setOptimisticIngredient,
    setIngredientToEdit,
    refetch,
  }) => {
    const {
      isPending,
      error,
      handleSubmit,
      handleClose,
      handleEditIngredientAction,
    } = useEditIngredient({
      ingredient,
      setOptimisticIngredient,
      setIngredientToEdit,
      refetch,
      onOpenChange,
    });

    return (
      <CancelConfirmModal
        isOpen={isOpen}
        placement="center"
        onOpenChange={handleClose}
        headerLabel="Upravit ingredienci"
        hideFooter
        isDismissable={false}
      >
        <EditIngredientModalContent
          ingredient={ingredient}
          onCancel={handleClose}
          action={handleEditIngredientAction}
          onSubmit={handleSubmit}
          errors={error}
          isPending={isPending}
        />
      </CancelConfirmModal>
    );
  }
);

EditIngredientModal.displayName = "EditIngredientModal";

export default EditIngredientModal;
