import { memo } from "react";

import Button from "@/components/shared/button/Button";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { useKeyboardNavigation } from "@/lib/hooks/ui/useKeyboardNavigation";

interface DeleteModalActionsProps {
  onCancel: () => void;
  isPending: boolean;
  onConfirm?: () => void;
}

export const DeleteModalActions = memo<DeleteModalActionsProps>(
  ({ onCancel, isPending, onConfirm }) => {
    useKeyboardNavigation({
      Escape: { handler: onCancel },
      ...(onConfirm && !isPending ? { Enter: { handler: onConfirm } } : {}),
    });

    return (
      <div className="flex py-2 px-1 justify-between">
        <Button
          color="success"
          variant="flat"
          onPress={onCancel}
          type="button"
          aria-label="Zrušit mazání ingredience"
        >
          Zrušit
        </Button>
        <SubmitButton
          color="danger"
          disabled={isPending}
          isLoading={isPending}
          aria-label={
            isPending
              ? "Maže se ingredience..."
              : "Potvrdit smazání ingredience"
          }
        >
          Smazat
        </SubmitButton>
      </div>
    );
  }
);

DeleteModalActions.displayName = "DeleteModalActions";
