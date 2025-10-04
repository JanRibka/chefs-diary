import { useMemo, useOptimistic } from "react";

import { useUserContext } from "@/context/UserContext";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { useServerActionWithLoading } from "@/lib/hooks/apiHooks/shared/useServerActionWithLoading";
import { getPageItems, getPages, getSortedItems } from "@/lib/utils/table";

import { useIngredientsTableContext } from "../context/hooks/useIngredientsTableContext";

export type SetOptimisticIngredient = {
  type: "add" | "update" | "delete";
  ingredient: IngredientWithAssignedGroupDTO;
};

export function useIngredientsTableState(
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>
  >
) {
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
