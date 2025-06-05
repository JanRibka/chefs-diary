import { Dispatch, SetStateAction, useTransition } from "react";

import { deleteUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import addToast from "@/lib/utils/addToast";

import DeleteUnitModalContent from "./DeleteUnitModalContent";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (action: UnitWithGroupInfoSummaryDTO) => void;
  setUnitToDelete: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
};

export default function DeleteUnitModal({
  unit,
  isOpen,
  onOpenChange,
  setOptimisticUnit,
  setUnitToDelete,
}: Props) {
  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleDeleteUnitAction = async () => {
    if (!unit) return;

    setOptimisticUnit({
      ...unit,
    });

    startTransition(async () => {
      const response = await deleteUnitAction(unit.idUnit);

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně smazána", "success");
        onOpenChange();
      }
    });
  };

  // Handlers
  const handleCloseDeleteUnit = () => {
    setUnitToDelete(null);
    onOpenChange();
  };

  if (!unit) return null;

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseDeleteUnit}
      headerLabel="Smazat skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <DeleteUnitModalContent
        unit={unit}
        onCancel={handleCloseDeleteUnit}
        action={handleDeleteUnitAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
