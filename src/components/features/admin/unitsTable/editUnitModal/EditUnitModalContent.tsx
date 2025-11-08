import { useState } from "react";

import Form from "@/components/shared/form/Form";

import ModalActions from "./components/ModalActions";
import UnitNameInput from "./components/UnitModalInput";
import { EditUnitModalContentProps } from "./types";

const EditUnitModalContent = ({
  unit,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending = false,
}: EditUnitModalContentProps) => {
  const [unitName, setUnitName] = useState(unit.name);

  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <UnitNameInput
        value={unitName}
        onChange={setUnitName}
        errors={errors}
        disabled={isPending}
      />

      <ModalActions onCancel={onCancel} isPending={isPending} />
    </Form>
  );
};

export default EditUnitModalContent;
