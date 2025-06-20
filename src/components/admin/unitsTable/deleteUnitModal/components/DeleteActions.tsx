import { memo } from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

import { ACTIONS_CONFIG, BUTTON_CONFIG } from "../constants";
import { DeleteActionsProps } from "../types";

const DeleteActions = memo<DeleteActionsProps>(({ onCancel, isPending }) => (
  <div className={ACTIONS_CONFIG.className}>
    <Button
      color={BUTTON_CONFIG.cancel.color}
      variant={BUTTON_CONFIG.cancel.variant}
      onPress={onCancel}
    >
      {BUTTON_CONFIG.cancel.text}
    </Button>

    <SubmitButton
      color={BUTTON_CONFIG.delete.color}
      disabled={isPending}
      isLoading={isPending}
    >
      {BUTTON_CONFIG.delete.text}
    </SubmitButton>
  </div>
));

DeleteActions.displayName = "DeleteActions";

export default DeleteActions;
