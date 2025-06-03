import { Dispatch, SetStateAction, useTransition } from "react";

import { updateUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { UnitFormType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { Unit } from "@prisma/client";

import { SetOptimisticUnitType } from "../UnitsTable";
import EditUnitModalContent from "./EditUnitModalContent";
import useEditUnitValidation from "./useEditUnitValidation";

type Props = {
  unit: Unit;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (action: SetOptimisticUnitType) => void;
  setUnitToEdit: Dispatch<SetStateAction<Unit | null>>;
};

export default function EditUnitModal({
  unit,
  isOpen,
  onOpenChange,
  setOptimisticUnit,
  setUnitToEdit,
}: Props) {
  // Validations
  const { error, setError, validate } = useEditUnitValidation();

  // Handlers
  const handleSubmitEditUnit = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseEditUnit = () => {
    setUnitToEdit(null);
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleEditUnitAction = async (formData: FormData) => {
    setOptimisticUnit({
      type: "update",
      unit: {
        idUnit: unit.idUnit,
        name: formData.get(nameof<UnitFormType>("name")) as string,
      },
    });

    startTransition(async () => {
      const response = await updateUnitAction(unit.idUnit, formData);

      if (!response.success) {
        if (typeof response.error === "object") {
          setError(response.error);
          return;
        }

        addToast("Chyba", response.error as string, "danger");
      } else {
        addToast("Úspěch", "Jednotka byla úspěšně upravena", "success");
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseEditUnit}
      headerLabel="Upravit jednotku"
      hideFooter
      isDismissable={false}
    >
      <EditUnitModalContent
        unit={unit}
        onCancel={handleCloseEditUnit}
        action={handleEditUnitAction}
        onSubmit={handleSubmitEditUnit}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
