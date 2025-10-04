import React from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import ingredientFormValidationSchema, {
  IngredientFormErrorType,
  IngredientFormType,
} from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

interface IngredientFormFieldProps {
  errors: IngredientFormErrorType;
}

export const IngredientFormField: React.FC<IngredientFormFieldProps> = ({
  errors,
}) => (
  <ValidateInput
    name={nameof<IngredientFormType>("name")}
    label="Název ingredience"
    className="mb-4"
    required
    autoFocus
    errors={errors}
    autoComplete="off"
    fullWidth
    variant="faded"
    color="primary"
    validationSchema={ingredientFormValidationSchema}
    endContent={
      <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
    }
  />
);
