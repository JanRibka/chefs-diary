import {
  IngredientGroupModalAction,
  IngredientGroupModalState,
} from "../../types/addIngredientToGroupModal";

export function ingredientGroupModalReducer(
  state: IngredientGroupModalState,
  action: IngredientGroupModalAction
): IngredientGroupModalState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        selectedGroupIds: action.payload.groupIds,
        isInitialized: true,
      };
    case "SET_SELECTED_GROUPS":
      return {
        ...state,
        selectedGroupIds: action.payload,
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
        confirmationModal: {
          isOpen: false,
          message: "",
          onConfirm: () => {},
        },
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
