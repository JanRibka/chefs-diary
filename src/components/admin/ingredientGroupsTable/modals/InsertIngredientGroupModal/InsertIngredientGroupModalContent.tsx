import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import ingredientGroupFormValidationSchema, {
  IngredientGroupFormErrorType,
  IngredientGroupFormType,
} from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

type Props = {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientGroupFormErrorType;
  isPending?: boolean;
};

export default function InsertIngredientGroupModalContent({
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <ValidateInput
          name={nameof<IngredientGroupFormType>("name")}
          label="Název skupiny ingrediencí"
          className="mb-4"
          required
          autoFocus
          errors={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={ingredientGroupFormValidationSchema}
          endContent={
            <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex py-2 px-1 justify-between">
        <Button color="danger" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <SubmitButton
          color="primary"
          disabled={isPending}
          isLoading={isPending}
        >
          Uložit
        </SubmitButton>
      </div>
    </Form>
  );
}
