import { Dispatch, SetStateAction, useTransition } from "react";

import { updateUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { UnitFormType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";

import EditUnitModalContent from "./EditUnitModalContent";
import useEditUnitValidation from "./useEditUnitValidation";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (unit: UnitWithGroupInfoSummaryDTO) => void;
  setUnitToEdit: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
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
    if (!unit) return;

    setOptimisticUnit({
      idUnit: unit?.idUnit,
      name: formData.get(nameof<UnitFormType>("name")) as string,
      isBaseUnit: unit.isBaseUnit,
      unitGroupName: unit.unitGroupName,
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
