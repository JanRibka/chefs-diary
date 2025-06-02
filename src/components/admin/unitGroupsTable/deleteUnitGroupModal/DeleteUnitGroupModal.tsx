import { Dispatch, SetStateAction, useTransition } from "react";

import { deleteUnitGroupAction } from "@/actions/admin/units";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import addToast from "@/lib/utils/addToast";
import { UnitGroup } from "@prisma/client";

import { SetOptimisticUnitGroupType } from "../UnitGroupsTable";
import DeleteUnitGroupModalContent from "./DeleteUnitGroupModalContent";

type Props = {
  group: UnitGroup;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnitGroup: (action: SetOptimisticUnitGroupType) => void;
  setGroupToDelete: Dispatch<SetStateAction<UnitGroup | null>>;
};

export default function DeleteUnitGroupModal({
  group,
  isOpen,
  onOpenChange,
  setOptimisticUnitGroup,
  setGroupToDelete,
}: Props) {
  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleDeleteUnitGroupAction = async () => {
    setOptimisticUnitGroup({
      type: "delete",
      group: {
        ...group,
      },
    });

    startTransition(async () => {
      const unitGroup = await deleteUnitGroupAction(group.idUnitGroup);

      if (!unitGroup.success) {
        addToast("Chyba", unitGroup.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně smazána", "success");
        onOpenChange();
      }
    });
  };

  // Handlers
  const handleCloseDeleteGroup = () => {
    setGroupToDelete(null);
    onOpenChange();
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseDeleteGroup}
      headerLabel="Smazat skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <DeleteUnitGroupModalContent
        group={group}
        onCancel={handleCloseDeleteGroup}
        action={handleDeleteUnitGroupAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
