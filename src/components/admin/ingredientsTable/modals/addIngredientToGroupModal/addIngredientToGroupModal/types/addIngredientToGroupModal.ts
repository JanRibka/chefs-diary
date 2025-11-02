import { Dispatch, SetStateAction } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

// Modal
export interface AddIngredientToGroupModalProps {
  ingredient: IngredientWithAssignedGroupDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setIngredientToAdd: Dispatch<
    SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  refetch: () => void;
}

export interface IngredientActionResponse {
  success: boolean;
  error?: string;
}

export type IngredientActionHandler = (formData: FormData) => Promise<void>;
export type RemoveIngredientActionHandler = () => Promise<void>;

export interface ConfirmationModal {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export interface IngredientGroupModalState {
  selectedGroupIds: string[];
  isInitialized: boolean;
  confirmationModal: ConfirmationModal;
  isRemoving: boolean;
}

export type IngredientGroupModalAction =
  | { type: "INITIALIZE"; payload: { groupIds: string[] } }
  | { type: "SET_SELECTED_GROUPS"; payload: string[] }
  | {
      type: "SHOW_CONFIRMATION";
      payload: { message: string; onConfirm: () => void };
    }
  | { type: "HIDE_CONFIRMATION" }
  | { type: "SET_REMOVING"; payload: boolean };
