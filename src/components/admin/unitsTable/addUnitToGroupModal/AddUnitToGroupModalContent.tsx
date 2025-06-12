import { useEffect, useRef, useState } from "react";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import Spinner from "@/components/shared/spinner/Spinner";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import useUnitGroupDataForModalAction from "@/lib/hooks/apiHooks/admin/useUnitGroupDataForModal";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
};

export default function AddUnitToGroupModalContent({
  unit,
  onCancel,
  action,
  isPending,
}: Props) {
  // Data
  const { data, isLoading } = useUnitGroupDataForModalAction(unit.idUnit);

  // Component initialized
  const isInitialized = useRef(false);

  // State
  const [idSelectedGroup, setIdSelectedGroup] = useState<string[]>([]);
  const [isBaseUnit, setIsBaseUnit] = useState<boolean>(false);

  // Derived
  const baseUnitGroup = data.find((g) => g.isBaseUnit);
  const selectedGroup = data.find(
    (g) => g.idUnitGroup === parseInt(idSelectedGroup[0])
  );
  const showBaseUnitWarning = true;
  //   baseUnitGroup?.idUnitGroup === selectedGroup?.idUnitGroup &&
  //   !baseUnitGroup?.idsUnit?.includes(unit.idUnit);
  // debugger;
  // Effects
  useEffect(() => {
    if (isInitialized.current || !data.length) return;

    const defaultValue = data
      .find((f) => f.idsUnit?.includes(unit.idUnit))
      ?.idUnitGroup.toString();

    if (defaultValue) {
      setIdSelectedGroup([defaultValue]);
    }

    const selectedGroup = data.find(
      (f) => f.idUnitGroup.toString() === defaultValue
    );

    if (selectedGroup) {
      setIsBaseUnit(selectedGroup.isBaseUnit);
    }

    isInitialized.current = true;
  }, [data, unit.idUnit]);

  // Handlers
  const handleValueChangeUnitGroup = (value: string[]) => {
    setIdSelectedGroup((prev) => {
      const selectedValue = value.filter((f) => f !== "" && f !== prev[0]);

      const isBase =
        baseUnitGroup?.idUnitGroup === Number(selectedValue[0]) ? true : false;

      setIsBaseUnit(isBase);

      return selectedValue;
    });
  };

  const handleValueChangeIsBaseUnit = (value: string[]) => {
    setIsBaseUnit(value.length ? true : false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-80">
        <Spinner
          classNames={{
            circle1: "w-16 h-16",
            circle2: "w-16 h-16",
            wrapper: "w-16 h-16",
          }}
        />
      </div>
    );
  }

  return (
    <Form action={action} className="flex flex-col gap-5" noValidate>
      <div>
        <CheckboxGroup
          value={idSelectedGroup}
          onValueChange={handleValueChangeUnitGroup}
          className="mb-6"
          label={
            <>
              Vyberte skupinu ke které chcete jednotku &quot;
              <strong>{unit.name}</strong>&quot; přiřadit
            </>
          }
        >
          {data.map((group) => (
            <Checkbox
              key={`unitGroup_${group.idUnitGroup}`}
              name={nameof<UnitGroupModalDTO>("idUnitGroup")}
              value={group.idUnitGroup.toString()}
            >
              {group.unitGroupName}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <CheckboxGroup
          label="Vyberte zda je jednotka základní jednotka"
          value={[isBaseUnit.toString()]}
          onValueChange={handleValueChangeIsBaseUnit}
        >
          {showBaseUnitWarning && (
            <p className="text-sm text-yellow-600 mt-1">
              Aktuální základní jednotka:{" "}
              <strong>{selectedGroup?.baseUnitName}</strong>
              <br />
              Zaškrtnutím změníte základní jednotku.
            </p>
          )}
          <Checkbox
            value={true.toString()}
            name={nameof<UnitGroupModalDTO>("isBaseUnit")}
          >
            Je základní jednotka
          </Checkbox>
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

        {/* <Button type="submit" name="action" value="remove">
  Odebrat jednotku ze skupiny
</Button> */}
      </div>
    </Form>
  );
}
