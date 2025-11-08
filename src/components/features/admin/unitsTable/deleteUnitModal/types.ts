import { Dispatch, SetStateAction } from "react";

import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";

// Modal
export interface DeleteUnitModalProps {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (action: UnitWithGroupInfoSummaryDTO) => void;
  setUnitToDelete: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
}

export interface DeleteUnitActionResponse {
  success: boolean;
  error?: string;
}

export type DeleteUnitActionHandler = () => Promise<void>;

// Modal content
export interface DeleteUnitModalContentProps {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
}

export interface DeleteConfirmationTextProps {
  unitName: string;
}

export interface DeleteActionsProps {
  onCancel: () => void;
  isPending?: boolean;
}
