import React from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

interface IngredientActionButtonsProps {
  onCancel: () => void;
  isPending?: boolean;
}

export const IngredientActionButtons: React.FC<
  IngredientActionButtonsProps
> = ({ onCancel, isPending = false }) => (
  <div className="flex py-2 px-1 justify-between">
    <Button color="danger" variant="flat" onPress={onCancel}>
      Zrušit
    </Button>
    <SubmitButton color="primary" disabled={isPending} isLoading={isPending}>
      Uložit
    </SubmitButton>
  </div>
);
