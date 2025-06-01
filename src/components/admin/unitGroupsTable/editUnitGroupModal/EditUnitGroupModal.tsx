import { Dispatch, SetStateAction, useTransition } from "react";

import { updateUnitGroupAction } from "@/actions/admin/webData";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { EditUnitGroupFormType } from "@/lib/validations/schemas/admin/editUnitGroupFormValidationSchema";
import { UnitGroup } from "@prisma/client";

import { SetOptimisticUnitGroupType } from "../UnitGroupsTable";
import EditUnitGroupModalContent from "./EditUnitGroupModalContent";
import useEditUnitGroupValidation from "./useEditUnitGroupValidation";

type Props = {
  group: UnitGroup;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnitGroup: (action: SetOptimisticUnitGroupType) => void;
  setGroupToEdit: Dispatch<SetStateAction<UnitGroup | null>>;
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
        name: formData.get(nameof<EditUnitGroupFormType>("name")) as string,
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
