import { memo, useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { nameof } from "@/lib/utils/nameof";
import ingredientFormValidationSchema, {
  IngredientFormErrorType,
  IngredientFormType,
} from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";

interface EditFormFieldsProps {
  ingredient: IngredientWithAssignedGroupDTO;
  errors: IngredientFormErrorType;
}

export const EditFormFields = memo<EditFormFieldsProps>(
  ({ ingredient, errors }) => {
    const [value, setValue] = useState(ingredient.name);

    return (
      <div>
        <ValidateInput
          name={nameof<IngredientFormType>("name")}
          value={value}
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
          onValueChange={setValue}
          endContent={
            <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
    );
  }
);

EditFormFields.displayName = "EditFormFields";
