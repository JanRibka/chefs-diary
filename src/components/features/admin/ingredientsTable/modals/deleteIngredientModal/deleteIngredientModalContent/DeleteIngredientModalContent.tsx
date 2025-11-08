import { memo, useRef } from "react";

import Form from "@/components/shared/form/Form";

import { DeleteConfirmationMessage } from "./components/DeleteConfirmationMessage";
import { DeleteModalActions } from "./components/DeleteModalActions";
import { DeleteIngredientModalContentProps } from "./types/deleteIngredientModalContent";

const DeleteIngredientModalContent = memo<DeleteIngredientModalContentProps>(
  ({ ingredient, onCancel, action, isPending }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleConfirm = () => {
      formRef.current?.requestSubmit();
    };

    return (
      <Form
        ref={formRef}
        action={action}
        className="flex flex-col gap-5"
        noValidate
      >
        <DeleteConfirmationMessage ingredientName={ingredient.name} />
        <DeleteModalActions
          onCancel={onCancel}
          isPending={isPending ?? false}
          onConfirm={handleConfirm}
        />
      </Form>
    );
  }
);

DeleteIngredientModalContent.displayName = "DeleteIngredientModalContent";

export default DeleteIngredientModalContent;
