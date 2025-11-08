import { Dispatch, SetStateAction } from "react";

import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { UnitFormErrorType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";

// Modal
export interface EditUnitModalProps {
  unit: UnitWithGroupInfoSummaryDTO | null;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticUnit: (unit: UnitWithGroupInfoSummaryDTO) => void;
  setUnitToEdit: Dispatch<SetStateAction<UnitWithGroupInfoSummaryDTO | null>>;
}

export interface UseEditUnitModalProps {
  unit: UnitWithGroupInfoSummaryDTO | null;
  onOpenChange: () => void;
  setOptimisticUnit: (unit: UnitWithGroupInfoSummaryDTO) => void;
  setUnitToEdit: (unit: UnitWithGroupInfoSummaryDTO | null) => void;
}

export interface UseEditUnitModalReturn {
  error: UnitFormErrorType;
  setError: (error: UnitFormErrorType) => void;
  isPending: boolean;
  validateForm: (event: React.FormEvent<HTMLFormElement>) => boolean;
  handleClose: () => void;
  handleSubmit: (formData: FormData) => Promise<void>;
}

// Modal content
export interface ModalActionsProps {
  onCancel: () => void;
  isPending: boolean;
}

export interface UnitNameInputProps {
  value: string;
  onChange: (value: string) => void;
  errors: UnitFormErrorType;
  disabled?: boolean;
}

export interface EditUnitModalContentProps {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: UnitFormErrorType;
  isPending?: boolean;
}
