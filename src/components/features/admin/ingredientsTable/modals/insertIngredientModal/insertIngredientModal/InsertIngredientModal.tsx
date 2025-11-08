import { useTransition } from "react";

import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

import InsertIngredientModalContent from "../insertIngredientModalContent/InsertIngredientModalContent";
import { useInsertIngredientModal } from "./hooks/useInsertIngredientModal";

interface InsertIngredientModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  refetch: () => void;
}

export function InsertIngredientModal({
  isOpen,
  onOpenChange,
  setOptimisticIngredient,
  refetch,
}: InsertIngredientModalProps) {
  const [isPending, startTransition] = useTransition();

  const { error, handleSubmit, handleClose, handleInsertAction } =
    useInsertIngredientModal({
      onOpenChange,
      setOptimisticIngredient,
      refetch,
      startTransition,
    });

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      headerLabel="Přidat ingredienci"
      hideFooter
      isDismissable={false}
    >
      <InsertIngredientModalContent
        onCancel={handleClose}
        action={handleInsertAction}
        onSubmit={handleSubmit}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
