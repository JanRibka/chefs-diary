import { memo } from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

import { ActionButtonsProps } from "../types/addIngredientToGroupModalContent";

const ActionButtons = memo<ActionButtonsProps>(
  ({ isPending, selectedGroupIds, onCancel, onRemove }) => {
    const isDisabled = isPending || selectedGroupIds.length === 0;

    return (
      <div className="flex justify-between items-center py-2">
        <Button color="success" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>

        <div className="flex gap-2">
          <Button
            color="danger"
            variant="flat"
            isDisabled={isDisabled}
            isLoading={isPending}
            onPress={onRemove}
          >
            odebrat ze skupiny
          </Button>
          <SubmitButton
            color="primary"
            variant="solid"
            isDisabled={isDisabled}
            isLoading={isPending}
          >
            Uložit
          </SubmitButton>
        </div>
      </div>
    );
  }
);

ActionButtons.displayName = "ActionButtons";

export default ActionButtons;
