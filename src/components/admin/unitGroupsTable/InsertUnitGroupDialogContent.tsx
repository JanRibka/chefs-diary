import { useRef } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import insertUnitGroupFormValidationSchema, {
  InsertUnitGroupFormErrorType,
  InsertUnitGroupFormType,
} from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";

type Props = {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: InsertUnitGroupFormErrorType;
  isPending?: boolean;
};

export default function InsertUnitGroupDialogContent({
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  const refUnitName = useRef<HTMLInputElement>(null);

  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <ValidateInput
          ref={refUnitName}
          name={nameof<InsertUnitGroupFormType>("name")}
          label="Název skupiny jednotek"
          className="mb-4"
          required
          errors={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={insertUnitGroupFormValidationSchema}
          endContent={
            <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex py-2 px-1 justify-between">
        <Button
          color="danger"
          variant="flat"
          disabled={isPending}
          onPress={onCancel}
        >
          Zrušit
        </Button>
        <SubmitButton color="primary">Uložit</SubmitButton>
      </div>
    </Form>
  );
}
