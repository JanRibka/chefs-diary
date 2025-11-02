import { memo } from "react";

interface DeleteConfirmationMessageProps {
  ingredientName?: string;
}

export const DeleteConfirmationMessage = memo<DeleteConfirmationMessageProps>(
  ({ ingredientName }) => {
    return (
      <p role="alert" aria-live="polite" className="text-center text-lg">
        Opravdu chcete smazat ingredienci <strong>{ingredientName}</strong>?
      </p>
    );
  }
);

DeleteConfirmationMessage.displayName = "DeleteConfirmationMessage";
