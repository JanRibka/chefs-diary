import { useTransition } from "react";

import { insertUnitAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { InsertUnitFormType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";

import { SetOptimisticUnitType } from "../UnitsTable";
import InsertUnitModalContent from "./InsertUnitModalContent";
import useInsertUnitValidation from "./useInsertUnitValidation";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (action: SetOptimisticUnitType) => void;
};

export default function InsertUnitModal({
  isOpen,
  onOpenChange,
  setOptimisticUnit,
}: Props) {
  // Validations
  const { error, setError, validate } = useInsertUnitValidation();

  // Handlers
  const handleSubmitInsert = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseInsert = () => {
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleInsertUnitAction = async (formData: FormData) => {
    setOptimisticUnit({
      type: "add",
      unit: {
        idUnit: Math.random(),
        name: formData.get(nameof<InsertUnitFormType>("name")) as string,
      },
    });

    startTransition(async () => {
      const unit = await insertUnitAction(formData);

      if (!unit.success) {
        if (typeof unit.error === "object") {
          setError(unit.error);
          return;
        }

        addToast("Chyba", unit.error as string, "danger");
      } else {
        addToast("Úspěch", "Jednotka byla úspěšně přidána", "success");
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseInsert}
      headerLabel="Přidat jednotku"
      hideFooter
      isDismissable={false}
    >
      <InsertUnitModalContent
        onCancel={handleCloseInsert}
        action={handleInsertUnitAction}
        onSubmit={handleSubmitInsert}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
