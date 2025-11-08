import { useMemo, useOptimistic } from "react";

import { useUserContext } from "@/lib/context/UserContext";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { useServerActionWithLoading } from "@/lib/hooks/apiHooks/shared/useServerActionWithLoading";
import { getPageItems, getPages, getSortedItems } from "@/lib/utils/table";
import { SortDescriptor } from "@heroui/react";

import { useIngredientsTableContext } from "../context/hooks/useIngredientsTableContext";

export type SetOptimisticIngredient = {
  type: "add" | "update" | "delete";
  ingredient: IngredientWithAssignedGroupDTO;
};

export type UseIngredientsTableStateReturn = {
  data: PaginatedDTO<IngredientWithAssignedGroupDTO> | null;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (descriptor: SortDescriptor) => void;
  pages: number;
  canEdit: boolean;
  canDelete: boolean;
  optimisticIngredients: IngredientWithAssignedGroupDTO[];
  setOptimisticIngredient: (action: SetOptimisticIngredient) => void;
  isPending: boolean;
  refetch: () => void;
};

/**
 * useIngredientsTableState - Hook for managing ingredients table state
 *
 * Provides state management for ingredients table including sorting, pagination,
 * permissions, and optimistic updates.
 *
 * @param serverAction - Server action to fetch ingredients data
 * @returns Object containing table state and actions
 *
 * @example
 * const {
 *   data,
 *   pages,
 *   canEdit,
 *   optimisticIngredients,
 *   isPending
 * } = useIngredientsTableState(fetchIngredientsAction);
 */
export function useIngredientsTableState(
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>
  >
): UseIngredientsTableStateReturn {
  // Get data
  const { isPending, data, refetch } = useServerActionWithLoading(serverAction);

  // Context
  const { user } = useUserContext();
  const { state, actions } = useIngredientsTableContext();

  // Permissions
  const canEdit =
    user?.permissions.includes(PermissionTypeEnum.INGREDIENT_EDIT) ?? false;
  const canDelete =
    user?.permissions.includes(PermissionTypeEnum.INGREDIENT_DELETE) ?? false;

  // Calculations
  const pages = useMemo(
    () => getPages(data?.totalCount, state.pageSize),
    [data?.totalCount, state.pageSize]
  );
  const sortedItems = useMemo(
    () =>
      getSortedItems<IngredientWithAssignedGroupDTO>(
        data?.items,
        state.sortDescriptor
      ),
    [state.sortDescriptor, data?.items]
  );
  const pageItems = useMemo(
    () => getPageItems(sortedItems, state.page, state.pageSize),
    [sortedItems, state.page, state.pageSize]
  );

  // Optimistic state
  const [optimisticIngredients, setOptimisticIngredient] = useOptimistic(
    pageItems,
    (state, action: SetOptimisticIngredient) => {
      switch (action.type) {
        case "add":
          return [...state, action.ingredient];
        case "update":
          return state.map((item) =>
            item.idIngredient === action.ingredient.idIngredient
              ? { ...item, name: action.ingredient.name }
              : item
          );
        case "delete":
          return state.filter(
            (item) => item.idIngredient !== action.ingredient.idIngredient
          );
      }
    }
  );

  return {
    data,
    sortDescriptor: state.sortDescriptor,
    setSortDescriptor: actions.setSortDescriptor,
    pages,
    canEdit,
    canDelete,
    optimisticIngredients,
    setOptimisticIngredient,
    isPending,
    refetch,
  };
}
