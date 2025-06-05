import { useRef, useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import useUnitGroupDataForModalAction from "@/lib/hooks/apiHooks/admin/useUnitGroupDataForModal";
import { nameof } from "@/lib/utils/nameof";
import unitFormValidationSchema, {
  UnitFormErrorType,
  UnitFormType,
} from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { Checkbox, CheckboxGroup } from "@heroui/react";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: UnitFormErrorType;
  isPending?: boolean;
};

export default function AddUnitToGroupModalContent({
  unit,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  // Data
  const { data, isLoading } = useUnitGroupDataForModalAction(unit.idUnit);
  const defaultValue =
    data.find((f) => f.idBaseUnit === unit.idUnit)?.idUnitGroup.toString() ??
    "";

  console.log(data);

  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <CheckboxGroup
          defaultValue={[defaultValue]}
          label="Vyberte skupinu ke které chcete jednotku přiřadit"
        >
          {data.map((item) => (
            <Checkbox
              key={`unitGroup_${item.idUnitGroup}`}
              name={nameof<UnitGroupModalDTO>("idUnitGroup")}
              value={item.idUnitGroup.toString()}
            >
              {item.unitGroupName}
            </Checkbox>
          ))}
        </CheckboxGroup>
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
