import { getAllUnitGroups } from "@/lib/services/unitsService";
import { UnitFormErrorType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { Unit } from "@prisma/client";

import AddUnitToGroupModalContent from "./AddUnitToGroupModalContent";

type Props = {
  unit: Unit;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: UnitFormErrorType;
  isPending?: boolean;
};

export default function AddUnitToGroupModalContentServerWrapper({
  unit,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  const dataPromise = getAllUnitGroups();

  return (
    <AddUnitToGroupModalContent
      unit={unit}
      onCancel={onCancel}
      action={action}
      onSubmit={onSubmit}
      errors={errors}
      isPending={isPending}
      dataPromise={dataPromise}
    />
  );
}
