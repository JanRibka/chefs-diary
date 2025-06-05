import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";

import { SetOptimisticUnitType } from "./useUnitsTableState";

export default function useUnitOptimistic(
  setOptimisticUnit: (action: SetOptimisticUnitType) => void
) {
  return {
    insertUnit: (unit: UnitWithGroupInfoSummaryDTO) =>
      setOptimisticUnit({ type: "add", unit }),
    editUnit: (unit: UnitWithGroupInfoSummaryDTO) =>
      setOptimisticUnit({ type: "update", unit }),
    deleteUnit: (unit: UnitWithGroupInfoSummaryDTO) =>
      setOptimisticUnit({ type: "delete", unit }),
  };
}
