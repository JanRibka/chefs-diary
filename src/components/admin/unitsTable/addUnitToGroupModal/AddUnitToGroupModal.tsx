import { Dispatch, SetStateAction, useTransition } from "react";

import {
  addUnitToGroupAction,
  removeUnitFromGroupAction,
} from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import addToast from "@/lib/utils/addToast";

import AddUnitToGroupModalContent from "./AddUnitToGroupModalContent";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setUnitToAdd: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
};

export default function AddUnitToGroupModal({
  unit,
  isOpen,
  onOpenChange,
  setUnitToAdd,
}: Props) {
  // Handlers
  const handleCloseEditUnit = () => {
    setUnitToAdd(null);
    onOpenChange();
  };

  // Actions
  const [isPending, startTransition] = useTransition();

  const handleEditUnitAction = async (formData: FormData) => {
    if (!unit) return;

    startTransition(async () => {
      const response = await addUnitToGroupAction(unit.idUnit, formData);

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
      } else {
        addToast(
          "Úspěch",
          "Jednotka byla úspěšně přiřazena do skupiny",
          "success"
        );
        onOpenChange();
      }
    });
  };

  const handleRemoveUnitAction = async (idUnitGroup: number) => {
    if (!unit) return;

    startTransition(async () => {
      const response = await removeUnitFromGroupAction(
        unit.idUnit,
        idUnitGroup
      );

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
      } else {
        addToast(
          "Úspěch",
          "Jednotka byla úspěšně odebraná ze skupiny",
          "success"
        );
        onOpenChange();
      }
    });
  };

  if (!unit) return null;

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseEditUnit}
      headerLabel="Upravit jednotku"
      hideFooter
      isDismissable={false}
    >
      <AddUnitToGroupModalContent
        unit={unit}
        onCancel={handleCloseEditUnit}
        saveAction={handleEditUnitAction}
        removeAction={handleRemoveUnitAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
