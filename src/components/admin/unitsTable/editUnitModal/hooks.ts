import { useCallback, useState, useTransition } from "react";

import { updateUnitAction } from "@/actions/admin/units";
import addToast from "@/lib/utils/addToast";
import { UnitFormErrorType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { validateUnitForm } from "@/lib/validations/validations/admin/validateUnitForm";

import { EDIT_UNIT_MODAL_TEXTS } from "./constants";
import { UseEditUnitModalProps, UseEditUnitModalReturn } from "./types";
import {
  createOptimisticUnit,
  createTimestampedError,
  extractFormData,
} from "./utils";

// useEditUnitModal
export const useEditUnitModal = ({
  unit,
  onOpenChange,
  setOptimisticUnit,
  setUnitToEdit,
}: UseEditUnitModalProps): UseEditUnitModalReturn => {
  const [error, setError] = useState<UnitFormErrorType>({});
  const [isPending, startTransition] = useTransition();

  const validateForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>): boolean => {
      const data = extractFormData(event);
      const validationResult = validateUnitForm(data);

      if (!validationResult.success) {
        event.preventDefault();
        setError(createTimestampedError(validationResult.error));
        return false;
      }

      setError({});
      return true;
    },
    []
  );

  const handleClose = useCallback(() => {
    setUnitToEdit(null);
    setError({});
    onOpenChange();
  }, [setUnitToEdit, onOpenChange]);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (!unit) return;

      const optimisticUnit = createOptimisticUnit(unit, formData);
      setOptimisticUnit(optimisticUnit);

      startTransition(async () => {
        try {
          const response = await updateUnitAction(unit.idUnit, formData);

          if (!response.success) {
            if (typeof response.error === "object") {
              setError(response.error);
              return;
            }
            addToast(
              EDIT_UNIT_MODAL_TEXTS.ERROR_TITLE,
              response.error as string,
              "danger"
            );
            return;
          }

          addToast(
            EDIT_UNIT_MODAL_TEXTS.SUCCESS_TITLE,
            EDIT_UNIT_MODAL_TEXTS.SUCCESS_MESSAGE,
            "success"
          );
          onOpenChange();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          addToast(
            EDIT_UNIT_MODAL_TEXTS.ERROR_TITLE,
            EDIT_UNIT_MODAL_TEXTS.UNEXPECTED_ERROR,
            "danger"
          );
        }
      });
    },
    [unit, setOptimisticUnit, onOpenChange]
  );

  return {
    error,
    setError,
    isPending,
    validateForm,
    handleClose,
    handleSubmit,
  };
};
