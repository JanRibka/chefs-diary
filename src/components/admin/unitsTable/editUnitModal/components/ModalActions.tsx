import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";

import { EDIT_UNIT_MODAL_TEXTS } from "../constants";
import { ModalActionsProps } from "../types";

const ModalActions = ({ onCancel, isPending }: ModalActionsProps) => (
  <div className="flex py-2 px-1 justify-between">
    <Button
      color="danger"
      variant="flat"
      onPress={onCancel}
      disabled={isPending}
    >
      {EDIT_UNIT_MODAL_TEXTS.CANCEL_BUTTON}
    </Button>
    <SubmitButton color="primary" disabled={isPending} isLoading={isPending}>
      {EDIT_UNIT_MODAL_TEXTS.SAVE_BUTTON}
    </SubmitButton>
  </div>
);

export default ModalActions;
