import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";

import { INITIAL_STATE } from "./constants";
import { UnitGroupModalAction, UnitGroupModalState } from "./types";

export function unitGroupModalReducer(
  state: UnitGroupModalState,
  action: UnitGroupModalAction
): UnitGroupModalState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        selectedGroupIds: action.payload.groupIds,
        isBaseUnit: action.payload.isBaseUnit,
        isInitialized: true,
      };
    case "SET_SELECTED_GROUPS":
      return {
        ...state,
        selectedGroupIds: action.payload,
      };
    case "SET_IS_BASE_UNIT":
      return {
        ...state,
        isBaseUnit: action.payload,
      };
    case "SHOW_CONFIRMATION":
      return {
        ...state,
        confirmationModal: {
          isOpen: true,
          message: action.payload.message,
          onConfirm: action.payload.onConfirm,
        },
      };
    case "HIDE_CONFIRMATION":
      return {
        ...state,
        confirmationModal: INITIAL_STATE.confirmationModal,
      };
    case "SET_REMOVING":
      return {
        ...state,
        isRemoving: action.payload,
      };
    default:
      return state;
  }
}

export function findExistingGroup(
  groupData: UnitGroupModalDTO[],
  unitId: number
) {
  return groupData.find((group) => group.idsUnit?.includes(unitId));
}

export function isBaseUnitInGroup(
  unit: UnitWithGroupInfoSummaryDTO,
  selectedGroup: UnitGroupModalDTO
): boolean {
  return unit.baseUnitGroupIds.includes(selectedGroup?.baseUnit?.idUnit || 0);
}
