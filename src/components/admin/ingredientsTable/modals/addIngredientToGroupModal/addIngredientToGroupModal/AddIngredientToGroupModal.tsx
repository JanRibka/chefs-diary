import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";

import AddIngredientToGroupModalContent from "../addIngredientToGroupModalContent/AddIngredientToGroupModalContent";
import { useIngredientActions } from "./hooks/useIngredientActions";
import { AddIngredientToGroupModalProps } from "./types/addIngredientToGroupModal";

export default function AddIngredientToGroupModal({
  ingredient,
  isOpen,
  onOpenChange,
  setIngredientToAdd,
  refetch,
}: AddIngredientToGroupModalProps) {
  const handleClose = () => {
    setIngredientToAdd(null);
    onOpenChange();
  };

  const { isPending, handleAddIngredient, handleRemoveIngredient } =
    useIngredientActions({
      ingredient,
      onSuccess: handleClose,
      refetch,
    });

  // Early return pokud není ingredient
  if (!ingredient) return null;

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      headerLabel="Přidat ingredienci do skupiny"
      hideFooter={true}
      isDismissable={false}
    >
      <AddIngredientToGroupModalContent
        ingredient={ingredient}
        onCancel={handleClose}
        saveAction={handleAddIngredient}
        removeAction={handleRemoveIngredient}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
