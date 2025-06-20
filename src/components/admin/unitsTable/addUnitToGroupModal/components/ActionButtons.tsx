import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

import { ActionButtonsProps } from "../types";

export function ActionButtons({
  isPending,
  selectedGroupIds,
  onCancel,
  onRemove,
}: ActionButtonsProps) {
  const isDisabled = isPending || selectedGroupIds.length === 0;

  return (
    <div className="flex justify-between items-center pt-4 pb-2 border-t">
      <Button color="primary" variant="bordered" onPress={onCancel}>
        Zrušit
      </Button>

      <div className="flex gap-2">
        <Button
          color="danger"
          variant="flat"
          disabled={isDisabled}
          isLoading={isPending}
          onPress={onRemove}
        >
          Odebrat ze skupiny
        </Button>
        <SubmitButton
          color="primary"
          disabled={isDisabled}
          isLoading={isPending}
        >
          Uložit
        </SubmitButton>
      </div>
    </div>
  );
}
