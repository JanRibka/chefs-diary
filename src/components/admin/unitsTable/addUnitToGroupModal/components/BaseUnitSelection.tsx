import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

import { BaseUnitSectionProps } from "../types";

export function BaseUnitSection({
  isBaseUnit,
  showBaseUnitWarning,
  baseUnitInSelectedGroup,
  selectedGroupIds,
  //   isRemoving,
  onBaseUnitToggle,
}: BaseUnitSectionProps) {
  return (
    <CheckboxGroup
      label="Vyberte zda je jednotka základní jednotka"
      value={isBaseUnit ? [true.toString()] : []}
      onValueChange={onBaseUnitToggle}
    >
      {showBaseUnitWarning && (
        <div className="text-sm text-yellow-600 mb-2 p-2 bg-yellow-50 rounded">
          <p>
            Aktuální základní jednotka:{" "}
            <strong>{baseUnitInSelectedGroup?.name}</strong>
          </p>
          <p>Zaškrtnutím změníte základní jednotku.</p>
        </div>
      )}
      <Checkbox
        value={true.toString()}
        name={nameof<UnitGroupModalDTO>("isBaseUnit")}
        isDisabled={selectedGroupIds.length === 0}
      >
        Je základní jednotka
      </Checkbox>
    </CheckboxGroup>
  );
}
