import React, { useCallback, useEffect, useMemo, useReducer } from "react";

import { getIngredientGroupDataForModalAction } from "@/actions/admin/ingredients";
import { IngredientGroupModalDTO } from "@/lib/dTOs/admin/IngredientGroupModalDTO";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import addToast from "@/lib/utils/addToast";

import { IngredientGroupModalState } from "../types/addIngredientToGroupModal";
import { ingredientGroupModalReducer } from "./reducers/ingredientGroupModalReducer";

interface UseIngredientGroupModalParams {
  ingredient: IngredientWithAssignedGroupDTO;
  removeAction: () => Promise<void>;
}

interface UseIngredientGroupModalReturn {
  groupData: IngredientGroupModalDTO[];
  isLoading: boolean;
  state: IngredientGroupModalState;
  selectedGroup: IngredientGroupModalDTO | undefined;
  handleGroupSelection: (selectedIds: string[]) => void;
  handleRemoveFromGroup: () => Promise<void>;
  handleCloseModal: () => void;
}

export function useIngredientGroupModal({
  ingredient,
  removeAction,
}: UseIngredientGroupModalParams): UseIngredientGroupModalReturn {
  // Data fetching
  const { data: groupData = [], isLoading } = useIngredientGroupDataForModal(
    ingredient.idIngredient
  );

  // State management
  const [state, dispatch] = useReducer(ingredientGroupModalReducer, {
    selectedGroupIds: [],
    isInitialized: false,
    confirmationModal: {
      isOpen: false,
      message: "",
      onConfirm: () => {},
    },
    isRemoving: false,
  });

  // Memoized derived values
  const selectedGroup = useMemo(
    () =>
      groupData.find(
        (group: IngredientGroupModalDTO) =>
          group.idIngredientGroup === parseInt(state.selectedGroupIds[0] || "0")
      ),
    [groupData, state.selectedGroupIds]
  );

  // Initialize component with existing data
  useEffect(() => {
    if (state.isInitialized || !groupData.length) return;

    const existingGroup = groupData.find((group: IngredientGroupModalDTO) =>
      group.idsIngredient?.includes(ingredient.idIngredient)
    );

    if (existingGroup) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          groupIds: [existingGroup.idIngredientGroup.toString()],
        },
      });
    } else {
      dispatch({
        type: "INITIALIZE",
        payload: {
          groupIds: [],
        },
      });
    }
  }, [groupData, ingredient.idIngredient, state.isInitialized]);

  // Event handlers
  const showConfirmation = useCallback(
    (message: string, confirmAction: () => void) => {
      dispatch({
        type: "SHOW_CONFIRMATION",
        payload: {
          message,
          onConfirm: () => {
            confirmAction();
            dispatch({ type: "HIDE_CONFIRMATION" });
          },
        },
      });
    },
    []
  );

  const handleGroupSelection = useCallback(
    (selectedIds: string[]) => {
      const newSelection = selectedIds.filter(
        (id) => id !== "" && id !== state.selectedGroupIds[0]
      );

      dispatch({ type: "SET_SELECTED_GROUPS", payload: newSelection });
    },
    [state.selectedGroupIds]
  );

  const handleRemoveFromGroup = useCallback(async () => {
    if (!selectedGroup) return;

    dispatch({ type: "SET_REMOVING", payload: true });

    showConfirmation(
      "Chcete opravdu odebrat ingredienci ze skupiny? Pokračovat?",
      async () => {
        try {
          await removeAction();
        } finally {
          dispatch({ type: "SET_REMOVING", payload: false });
        }
      }
    );
  }, [selectedGroup, removeAction, showConfirmation]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "HIDE_CONFIRMATION" });
  }, []);

  return {
    // Data
    groupData,
    isLoading,

    // State
    state,

    // Derived values
    selectedGroup,

    // Handlers
    handleGroupSelection,
    handleRemoveFromGroup,
    handleCloseModal,
  };
}

// Custom hook for fetching ingredient group data
function useIngredientGroupDataForModal(idIngredient: number) {
  const [data, setData] = React.useState<IngredientGroupModalDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await getIngredientGroupDataForModalAction(idIngredient);

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
      }

      setData(response.data ?? []);
      setIsLoading(false);
    }

    fetchData();
  }, [idIngredient]);

  return { data, isLoading };
}
