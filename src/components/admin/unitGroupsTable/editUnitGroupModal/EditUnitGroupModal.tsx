import { Dispatch, SetStateAction, useTransition } from "react";

import { updateUnitGroupAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import { UnitGroupSummaries } from "@/lib/dTOs/admin/UnitGroupSummariesDTO";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { UnitGroupFormType } from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";

import { SetOptimisticUnitGroupType } from "../UnitGroupsTable";
import EditUnitGroupModalContent from "./EditUnitGroupModalContent";
import useEditUnitGroupValidation from "./useEditUnitGroupValidation";

type Props = {
  group: UnitGroupSummaries;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnitGroup: (action: SetOptimisticUnitGroupType) => void;
  setGroupToEdit: Dispatch<SetStateAction<UnitGroupSummaries | null>>;
};

export default function EditUnitGroupModal({
  group,
  isOpen,
  onOpenChange,
  setOptimisticUnitGroup,
  setGroupToEdit,
}: Props) {
  // Validations
  const { error, setError, validate } = useEditUnitGroupValidation();

  // Handlers
  const handleSubmitEditGroup = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseEditGroup = () => {
    setGroupToEdit(null);
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleEditUnitGroupAction = async (formData: FormData) => {
    setOptimisticUnitGroup({
      type: "update",
      group: {
        idUnitGroup: group.idUnitGroup,
        name: formData.get(nameof<UnitGroupFormType>("name")) as string,
        baseUnitName: group.baseUnitName,
        unitNames: group.unitNames,
      },
    });

    startTransition(async () => {
      const unitGroup = await updateUnitGroupAction(
        group.idUnitGroup,
        formData
      );

      if (!unitGroup.success) {
        if (typeof unitGroup.error === "object") {
          setError(unitGroup.error);
          return;
        }

        addToast("Chyba", unitGroup.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně upravena", "success");
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseEditGroup}
      headerLabel="Upravit skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <EditUnitGroupModalContent
        group={group}
        onCancel={handleCloseEditGroup}
        action={handleEditUnitGroupAction}
        onSubmit={handleSubmitEditGroup}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
