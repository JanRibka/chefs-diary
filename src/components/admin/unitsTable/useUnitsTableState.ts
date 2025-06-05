import { use, useMemo, useOptimistic } from "react";

import { useUserContext } from "@/context/UserContext";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { getPageItems, getPages, getSortedItems } from "@/lib/utils/table";

import { useUnitsTableContext } from "./UnitsTableContext";

export type SetOptimisticUnitType = {
  type: "add" | "update" | "delete";
  unit: UnitWithGroupInfoSummaryDTO;
};

export function useUnitsTableState(
  dataPromise: Promise<
    ActionResponseDTO<PaginatedDTO<UnitWithGroupInfoSummaryDTO>>
  >
) {
  // Get data
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // Context
  const { user } = useUserContext();
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitsTableContext();

  // Permissions
  const canEdit =
    user?.permissions.includes(PermissionTypeEnum.UNIT_EDIT) ?? false;
  const canDelete =
    user?.permissions.includes(PermissionTypeEnum.UNIT_DELETE) ?? false;

  // Calculations
  const pages = useMemo(
    () => getPages(data.totalCount, pageSize),
    [data.totalCount, pageSize]
  );
  const sortedItems = useMemo(
    () =>
      getSortedItems<UnitWithGroupInfoSummaryDTO>(data.items, sortDescriptor),
    [sortDescriptor, data.items]
  );
  const pageItems = useMemo(
    () => getPageItems(sortedItems, page, pageSize),
    [sortedItems, page, pageSize]
  );

  // Optimistic state
  const [optimisticUnits, setOptimisticUnit] = useOptimistic(
    pageItems,
    (state, action: SetOptimisticUnitType) => {
      switch (action.type) {
        case "add":
          return [...state, action.unit];
        case "update":
          return state.map((item) =>
            item.idUnit === action.unit.idUnit
              ? { ...item, name: action.unit.name }
              : item
          );
        case "delete":
          return state.filter((item) => item.idUnit !== action.unit.idUnit);
      }
    }
  );

  return {
    data,
    sortDescriptor,
    setSortDescriptor,
    pages,
    canEdit,
    canDelete,
    optimisticUnits,
    setOptimisticUnit,
  };
}
