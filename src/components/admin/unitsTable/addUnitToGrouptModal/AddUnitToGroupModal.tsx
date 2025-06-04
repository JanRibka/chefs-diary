import { Dispatch, SetStateAction, useTransition } from "react";

import { updateUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { Unit } from "@prisma/client";

import AddUnitToGroupModalContent from "./AddUnitToGroupModalContent";

// import useEditUnitValidation from "./useEditUnitValidation";
const error = {};
type Props = {
  unit: Unit;
  isOpen: boolean;
  onOpenChange: () => void;
  // setOptimisticUnit: (action: SetOptimisticUnitType) => void;
  setUnitToAdd: Dispatch<SetStateAction<Unit | null>>;
};

export default function AddUnitToGroupModal({
  unit,
  isOpen,
  onOpenChange,
  // setOptimisticUnit,
  setUnitToAdd,
}: Props) {
  // Validations
  // const { error, setError, validate } = useEditUnitValidation();

  // Handlers
  const handleSubmitEditUnit = (event: React.FormEvent<HTMLFormElement>) => {
    // validate(event);
  };

  const handleCloseEditUnit = () => {
    setUnitToAdd(null);
    // setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleEditUnitAction = async (formData: FormData) => {
    // setOptimisticUnit({
    //   type: "update",
    //   unit: {
    //     idUnit: unit.idUnit,
    //     name: formData.get(nameof<UnitFormType>("name")) as string,
    //   },
    // });

    startTransition(async () => {
      const response = await updateUnitAction(unit.idUnit, formData);

      if (!response.success) {
        if (typeof response.error === "object") {
          // setError(response.error);
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
      <AddUnitToGroupModalContent
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
