import { Dispatch, SetStateAction, useTransition } from "react";

import { deleteUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { Unit } from "@prisma/client";

import { SetOptimisticUnitType } from "../UnitsTable";
import DeleteUnitModalContent from "./DeleteUnitModalContent";

type Props = {
  unit: Unit;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (action: SetOptimisticUnitType) => void;
  setUnitToDelete: Dispatch<SetStateAction<Unit | null>>;
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
    setOptimisticUnit({
      type: "delete",
      unit: {
        ...unit,
      },
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
