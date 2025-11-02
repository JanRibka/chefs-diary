import { memo } from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { useKeyboardNavigation } from "@/lib/hooks/ui/useKeyboardNavigation";

interface EditModalActionsProps {
  onCancel: () => void;
  isPending?: boolean;
  onConfirm?: () => void;
}

export const EditModalActions = memo<EditModalActionsProps>(
  ({ onCancel, isPending, onConfirm }) => {
    useKeyboardNavigation({
      Escape: { handler: onCancel },
      ...(onConfirm && !isPending ? { Enter: { handler: onConfirm } } : {}),
    });

    return (
      <div className="flex py-2 px-1 justify-between">
        <Button
          color="danger"
          variant="flat"
          onPress={onCancel}
          type="button"
          aria-label="Zrušit úpravu ingredience"
        >
          Zrušit
        </Button>
        <SubmitButton
          color="primary"
          disabled={isPending}
          isLoading={isPending}
          aria-label={
            isPending
              ? "Ukládá se ingredience..."
              : "Potvrdit úpravu ingredience"
          }
        >
          Uložit
        </SubmitButton>
      </div>
    );
  }
);

EditModalActions.displayName = "EditModalActions";
