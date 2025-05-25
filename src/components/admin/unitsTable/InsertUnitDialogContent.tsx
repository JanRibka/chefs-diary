import { useRef } from "react";
import { BsDisplay } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import insertUnitFormValidationSchema, {
  InsertUnitFormErrorType,
  InsertUnitFormType,
} from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";

type Props = {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: InsertUnitFormErrorType;
};

export default function InsertUnitDialogContent({
  onCancel,
  action,
  onSubmit,
  errors,
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
          name={nameof<InsertUnitFormType>("name")}
          label="Název jednotky"
          className="mb-4"
          required
          errors={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={insertUnitFormValidationSchema}
          endContent={
            <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <ValidateInput
          name={nameof<InsertUnitFormType>("displayName")}
          label="Zobrazované jméno"
          className="mb-4"
          required
          errors={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={insertUnitFormValidationSchema}
          endContent={
            <BsDisplay className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex py-2 px-1 justify-between">
        <Button color="danger" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <SubmitButton color="primary">Uložit</SubmitButton>
      </div>
    </Form>
  );
}
