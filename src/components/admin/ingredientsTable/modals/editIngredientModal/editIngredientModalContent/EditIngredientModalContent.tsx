import { memo, useRef } from "react";

import Form from "@/components/shared/form/Form";

import useEditIngredientValidation from "../editIngredientModal/hooks/useEditIngredientValidation";
import { EditFormFields } from "./components/EditFormFields";
import { EditModalActions } from "./components/EditModalActions";
import { EditIngredientModalContentProps } from "./types/editIngredientModalContent";

const EditIngredientModalContent = memo<EditIngredientModalContentProps>(
  ({ ingredient, onCancel, action, onSubmit, errors, isPending }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { validate } = useEditIngredientValidation();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (!validate(event)) {
        return;
      }
      onSubmit(event);
    };

    const handleConfirm = () => {
      formRef.current?.requestSubmit();
    };

    return (
      <Form
        ref={formRef}
        action={action}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        noValidate
      >
        <EditFormFields ingredient={ingredient} errors={errors} />
        <EditModalActions
          onCancel={onCancel}
          isPending={isPending}
          onConfirm={handleConfirm}
        />
      </Form>
    );
  }
);

EditIngredientModalContent.displayName = "EditIngredientModalContent";

export default EditIngredientModalContent;
