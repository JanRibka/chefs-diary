import React from "react";

import Form from "@/components/shared/form/Form";
import { IngredientFormErrorType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

import { IngredientActionButtons } from "./components/IngredientActionButtonsProps";
import { IngredientFormField } from "./components/IngredientFormField";

interface InsertIngredientModalContentProps {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientFormErrorType;
  isPending?: boolean;
}

export const InsertIngredientModalContent: React.FC<
  InsertIngredientModalContentProps
> = ({ onCancel, action, onSubmit, errors, isPending = false }) => {
  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <IngredientFormField errors={errors} />
      </div>

      <IngredientActionButtons onCancel={onCancel} isPending={isPending} />
    </Form>
  );
};

export default InsertIngredientModalContent;
