import { useTransition } from "react";

import { insertUnitGroupAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { UnitGroupFormType } from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";

import { SetOptimisticUnitGroupType } from "../UnitGroupsTable";
import InsertUnitGroupModalContent from "./InsertUnitGroupModalContent";
import useInsertUnitGroupValidation from "./useInsertUnitGroupValidation";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnitGroup: (action: SetOptimisticUnitGroupType) => void;
};

export default function InsertUnitGroupModal({
  isOpen,
  onOpenChange,
  setOptimisticUnitGroup,
}: Props) {
  // Validations
  const { error, setError, validate } = useInsertUnitGroupValidation();

  // Handlers
  const handleSubmitInsertGroup = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseInsertGroup = () => {
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleInsertUnitGroupAction = async (formData: FormData) => {
    setOptimisticUnitGroup({
      type: "add",
      group: {
        idUnitGroup: Math.random(),
        name: formData.get(nameof<UnitGroupFormType>("name")) as string,
        baseUnitName: null,
        unitNames: null,
      },
    });

    startTransition(async () => {
      const unitGroup = await insertUnitGroupAction(formData);

      if (!unitGroup.success) {
        if (typeof unitGroup.error === "object") {
          setError(unitGroup.error);
          return;
        }

        addToast("Chyba", unitGroup.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně přidána", "success");
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseInsertGroup}
      headerLabel="Přidat skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <InsertUnitGroupModalContent
        onCancel={handleCloseInsertGroup}
        action={handleInsertUnitGroupAction}
        onSubmit={handleSubmitInsertGroup}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
