import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";

import { EDIT_UNIT_MODAL_TEXTS } from "./constants";
import EditUnitModalContent from "./EditUnitModalContent";
import { useEditUnitModal } from "./hooks";
import { EditUnitModalProps } from "./types";

const EditUnitModal = ({
  unit,
  isOpen,
  onOpenChange,
  setOptimisticUnit,
  setUnitToEdit,
}: EditUnitModalProps) => {
  const { error, isPending, validateForm, handleClose, handleSubmit } =
    useEditUnitModal({
      unit,
      onOpenChange,
      setOptimisticUnit,
      setUnitToEdit,
    });

  if (!unit) return null;

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      headerLabel={EDIT_UNIT_MODAL_TEXTS.HEADER_LABEL}
      hideFooter={true}
      isDismissable={false}
    >
      <EditUnitModalContent
        unit={unit}
        onCancel={handleClose}
        action={handleSubmit}
        onSubmit={validateForm}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
};

export default EditUnitModal;
