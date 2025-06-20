import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

import { BUTTON_CONFIG } from "../constants";
import { ActionButtonsProps } from "../types";

export function ActionButtons({
  isPending,
  selectedGroupIds,
  onCancel,
  onRemove,
}: ActionButtonsProps) {
  const isDisabled = isPending || selectedGroupIds.length === 0;

  return (
    <div className="flex justify-between items-center py-2">
      <Button
        color={BUTTON_CONFIG.cancel.color}
        variant={BUTTON_CONFIG.cancel.variant}
        onPress={onCancel}
      >
        {BUTTON_CONFIG.cancel.text}
      </Button>

      <div className="flex gap-2">
        <Button
          color={BUTTON_CONFIG.remove.color}
          variant={BUTTON_CONFIG.remove.variant}
          isDisabled={isDisabled}
          isLoading={isPending}
          onPress={onRemove}
        >
          {BUTTON_CONFIG.remove.text}
        </Button>
        <SubmitButton
          color={BUTTON_CONFIG.save.color}
          variant={BUTTON_CONFIG.save.variant}
          isDisabled={isDisabled}
          isLoading={isPending}
        >
          {BUTTON_CONFIG.save.text}
        </SubmitButton>
      </div>
    </div>
  );
}
