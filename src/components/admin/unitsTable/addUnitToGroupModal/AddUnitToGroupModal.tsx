import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";

import AddUnitToGroupModalContent from "./AddUnitToGroupModalContent";
import { MODAL_CONFIG } from "./constants";
import { useUnitActions } from "./hooks";
import { AddUnitToGroupModalProps } from "./types";

export default function AddUnitToGroupModal({
  unit,
  isOpen,
  onOpenChange,
  setUnitToAdd,
}: AddUnitToGroupModalProps) {
  const handleClose = () => {
    setUnitToAdd(null);
    onOpenChange();
  };

  const { isPending, handleAddUnit, handleRemoveUnit } = useUnitActions({
    unit,
    onSuccess: handleClose,
  });

  // Early return pokud není unit
  if (!unit) return null;

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement={MODAL_CONFIG.placement}
      onOpenChange={handleClose}
      headerLabel={MODAL_CONFIG.headerLabel}
      hideFooter={MODAL_CONFIG.hideFooter}
      isDismissable={MODAL_CONFIG.isDismissable}
    >
      <AddUnitToGroupModalContent
        unit={unit}
        onCancel={handleClose}
        saveAction={handleAddUnit}
        removeAction={handleRemoveUnit}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
