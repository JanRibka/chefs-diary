import Form from "@/components/shared/form/Form";

import DeleteActions from "./components/DeleteActions";
import DeleteConfirmationText from "./components/DeleteConfirmationText";
import { FORM_CONFIG } from "./constants";
import { DeleteUnitModalContentProps } from "./types";

export default function DeleteUnitModalContent({
  unit,
  onCancel,
  action,
  isPending = false,
}: DeleteUnitModalContentProps) {
  return (
    <Form
      action={action}
      className={FORM_CONFIG.className}
      noValidate={FORM_CONFIG.noValidate}
    >
      <DeleteConfirmationText unitName={unit.name} />
      <DeleteActions onCancel={onCancel} isPending={isPending} />
    </Form>
  );
}
