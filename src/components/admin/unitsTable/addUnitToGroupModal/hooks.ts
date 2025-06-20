import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useTransition,
} from "react";

import {
  addUnitToGroupAction,
  removeUnitFromGroupAction,
} from "@/actions/admin/units";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import useUnitGroupDataForModalAction from "@/lib/hooks/apiHooks/admin/useUnitGroupDataForModal";
import addToast from "@/lib/utils/addToast";

import {
  CONFIRMATION_MESSAGES,
  INITIAL_STATE,
  TOAST_MESSAGES,
} from "./constants";
import { RemoveUnitActionHandler, UnitActionHandler } from "./types";
import {
  findExistingGroup,
  isBaseUnitInGroup,
  unitGroupModalReducer,
} from "./utils";

interface UseUnitActionsParams {
  unit: UnitWithGroupInfoSummaryDTO | null;
  onSuccess: () => void;
}

interface UseUnitActionsReturn {
  isPending: boolean;
  handleAddUnit: UnitActionHandler;
  handleRemoveUnit: RemoveUnitActionHandler;
}

export function useUnitActions({
  unit,
  onSuccess,
}: UseUnitActionsParams): UseUnitActionsReturn {
  const [isPending, startTransition] = useTransition();

  const handleAddUnit = useCallback<UnitActionHandler>(
    async (formData: FormData) => {
      if (!unit) return;

      startTransition(async () => {
        const response = await addUnitToGroupAction(unit.idUnit, formData);

        if (!response.success) {
          addToast(
            TOAST_MESSAGES.genericError.title,
            response.error as string,
            TOAST_MESSAGES.genericError.type
          );
          return;
        }

        addToast(
          TOAST_MESSAGES.addSuccess.title,
          TOAST_MESSAGES.addSuccess.message,
          TOAST_MESSAGES.addSuccess.type
        );
        onSuccess();
      });
    },
    [unit, onSuccess]
  );

  const handleRemoveUnit = useCallback<RemoveUnitActionHandler>(
    async (idUnitGroup: number) => {
      if (!unit) return;

      startTransition(async () => {
        const response = await removeUnitFromGroupAction(
          unit.idUnit,
          idUnitGroup
        );

        if (!response.success) {
          addToast(
            TOAST_MESSAGES.genericError.title,
            response.error as string,
            TOAST_MESSAGES.genericError.type
          );
          return;
        }

        addToast(
          TOAST_MESSAGES.removeSuccess.title,
          TOAST_MESSAGES.removeSuccess.message,
          TOAST_MESSAGES.removeSuccess.type
        );
        onSuccess();
      });
    },
    [unit, onSuccess]
  );

  return {
    isPending,
    handleAddUnit,
    handleRemoveUnit,
  };
}

export function useUnitGroupModal(
  unit: UnitWithGroupInfoSummaryDTO,
  removeAction: (idUnitGroup: number) => Promise<void>
) {
  // Data fetching
  const { data: groupData = [], isLoading } = useUnitGroupDataForModalAction(
    unit.idUnit
  );

  // State management
  const [state, dispatch] = useReducer(unitGroupModalReducer, INITIAL_STATE);

  // Memoized derived values
  const selectedGroup = useMemo(
    () =>
      groupData.find(
        (group) =>
          group.idUnitGroup === parseInt(state.selectedGroupIds[0] || "0")
      ),
    [groupData, state.selectedGroupIds]
  );

  const baseUnitInSelectedGroup = useMemo(
    () => selectedGroup?.baseUnit,
    [selectedGroup]
  );

  const showBaseUnitWarning = useMemo(
    () =>
      !!baseUnitInSelectedGroup &&
      baseUnitInSelectedGroup.idUnit !== unit.idUnit,
    [baseUnitInSelectedGroup, unit.idUnit]
  );

  // Initialize component with existing data
  useEffect(() => {
    if (state.isInitialized || !groupData.length) return;

    const existingGroup = findExistingGroup(groupData, unit.idUnit);

    if (existingGroup) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          groupIds: [existingGroup.idUnitGroup.toString()],
          isBaseUnit: existingGroup.isBaseUnit,
        },
      });
    } else {
      dispatch({
        type: "INITIALIZE",
        payload: {
          groupIds: [],
          isBaseUnit: false,
        },
      });
    }
  }, [groupData, unit.idUnit, state.isInitialized]);

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

      // Auto-set base unit status based on existing configuration
      const isAutoBaseUnit = unit.baseUnitGroupIds.includes(
        Number(newSelection[0])
      );
      dispatch({ type: "SET_IS_BASE_UNIT", payload: isAutoBaseUnit });
    },
    [state.selectedGroupIds, unit.baseUnitGroupIds]
  );

  const handleBaseUnitToggle = useCallback(
    (value: string[]) => {
      if (state.isRemoving) return;

      const shouldBeBaseUnit = value.length > 0;

      // Check if confirmation is needed
      const needsConfirmation =
        (shouldBeBaseUnit && showBaseUnitWarning) ||
        (!shouldBeBaseUnit && selectedGroup?.isBaseUnit);

      if (needsConfirmation) {
        const message = shouldBeBaseUnit
          ? CONFIRMATION_MESSAGES.SET_BASE_UNIT
          : CONFIRMATION_MESSAGES.UNSET_BASE_UNIT;

        showConfirmation(message, () => {
          dispatch({ type: "SET_IS_BASE_UNIT", payload: shouldBeBaseUnit });
        });
        return;
      }

      dispatch({ type: "SET_IS_BASE_UNIT", payload: shouldBeBaseUnit });
    },
    [
      state.isRemoving,
      showBaseUnitWarning,
      selectedGroup?.isBaseUnit,
      showConfirmation,
    ]
  );

  const handleRemoveFromGroup = useCallback(async () => {
    if (!selectedGroup) return;

    dispatch({ type: "SET_REMOVING", payload: true });

    const isRemovingBaseUnit = isBaseUnitInGroup(unit, selectedGroup);
    const message = isRemovingBaseUnit
      ? CONFIRMATION_MESSAGES.REMOVE_BASE_UNIT
      : CONFIRMATION_MESSAGES.REMOVE_UNIT;

    showConfirmation(message, async () => {
      try {
        await removeAction(selectedGroup.idUnitGroup);
      } finally {
        dispatch({ type: "SET_REMOVING", payload: false });
      }
    });
  }, [selectedGroup, unit, removeAction, showConfirmation]);

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
    baseUnitInSelectedGroup,
    showBaseUnitWarning,

    // Handlers
    handleGroupSelection,
    handleBaseUnitToggle,
    handleRemoveFromGroup,
    handleCloseModal,
  };
}
