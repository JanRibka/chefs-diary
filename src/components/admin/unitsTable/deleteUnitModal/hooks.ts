import { useCallback, useTransition } from "react";

import { deleteUnitAction } from "@/actions/admin/units";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import addToast from "@/lib/utils/addToast";

import { TOAST_MESSAGES } from "./constants";
import { DeleteUnitActionHandler } from "./types";

interface UseDeleteUnitActionParams {
  unit: UnitWithGroupInfoSummaryDTO | null;
  setOptimisticUnit: (action: UnitWithGroupInfoSummaryDTO) => void;
  onSuccess: () => void;
}

interface UseDeleteUnitActionReturn {
  isPending: boolean;
  handleDeleteUnit: DeleteUnitActionHandler;
}

export function useDeleteUnitAction({
  unit,
  setOptimisticUnit,
  onSuccess,
}: UseDeleteUnitActionParams): UseDeleteUnitActionReturn {
  const [isPending, startTransition] = useTransition();

  const handleDeleteUnit = useCallback<DeleteUnitActionHandler>(async () => {
    if (!unit) return;

    // Optimistic update
    setOptimisticUnit({
      ...unit,
    });

    startTransition(async () => {
      const response = await deleteUnitAction(unit.idUnit);

      if (!response.success) {
        addToast(
          TOAST_MESSAGES.genericError.title,
          response.error as string,
          TOAST_MESSAGES.genericError.type
        );
        return;
      }

      addToast(
        TOAST_MESSAGES.deleteSuccess.title,
        TOAST_MESSAGES.deleteSuccess.message,
        TOAST_MESSAGES.deleteSuccess.type
      );
      onSuccess();
    });
  }, [unit, setOptimisticUnit, onSuccess]);

  return {
    isPending,
    handleDeleteUnit,
  };
}
