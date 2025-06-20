import { Dispatch, SetStateAction } from "react";

import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";

// Modal
export interface AddUnitToGroupModalProps {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setUnitToAdd: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
}

export interface UnitActionResponse {
  success: boolean;
  error?: string;
}

export type UnitActionHandler = (formData: FormData) => Promise<void>;
export type RemoveUnitActionHandler = (idUnitGroup: number) => Promise<void>;

// Modal content
export interface UnitGroupModalProps {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  saveAction: (formData: FormData) => void;
  removeAction: (idUnitGroup: number) => Promise<void>;
  isPending?: boolean;
}

export interface ConfirmationModal {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export interface UnitGroupModalState {
  selectedGroupIds: string[];
  isBaseUnit: boolean;
  isInitialized: boolean;
  confirmationModal: ConfirmationModal;
  isRemoving: boolean;
}

export type UnitGroupModalAction =
  | { type: "INITIALIZE"; payload: { groupIds: string[]; isBaseUnit: boolean } }
  | { type: "SET_SELECTED_GROUPS"; payload: string[] }
  | { type: "SET_IS_BASE_UNIT"; payload: boolean }
  | {
      type: "SHOW_CONFIRMATION";
      payload: { message: string; onConfirm: () => void };
    }
  | { type: "HIDE_CONFIRMATION" }
  | { type: "SET_REMOVING"; payload: boolean };

export interface GroupSelectionProps {
  unit: UnitWithGroupInfoSummaryDTO;
  groupData: UnitGroupModalDTO[];
  selectedGroupIds: string[];
  onGroupChange: (selectedIds: string[]) => void;
}

export interface BaseUnitSectionProps {
  unit: UnitWithGroupInfoSummaryDTO;
  selectedGroup: UnitGroupModalDTO | undefined;
  isBaseUnit: boolean;
  showBaseUnitWarning: boolean;
  baseUnitInSelectedGroup:
    | Pick<UnitWithGroupInfoSummaryDTO, "name" | "idUnit">
    | null
    | undefined;
  selectedGroupIds: string[];
  isRemoving: boolean;
  onBaseUnitToggle: (value: string[]) => void;
}

export interface ActionButtonsProps {
  isPending: boolean;
  selectedGroupIds: string[];
  onCancel: () => void;
  onRemove: () => void;
}
