import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";

import { MODAL_CONFIG } from "./constants";
import DeleteUnitModalContent from "./DeleteUnitModalContent";
import { useDeleteUnitAction } from "./hooks";
import { DeleteUnitModalProps } from "./types";

export default function DeleteUnitModal({
  unit,
  isOpen,
  onOpenChange,
  setOptimisticUnit,
  setUnitToDelete,
}: DeleteUnitModalProps) {
  const handleClose = () => {
    setUnitToDelete(null);
    onOpenChange();
  };

  const { isPending, handleDeleteUnit } = useDeleteUnitAction({
    unit,
    setOptimisticUnit,
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
      <DeleteUnitModalContent
        unit={unit}
        onCancel={handleClose}
        action={handleDeleteUnit}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
