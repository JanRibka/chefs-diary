import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

import { GroupSelectionProps } from "../types";

export function GroupSelectionSection({
  unit,
  groupData,
  selectedGroupIds,
  onGroupChange,
}: GroupSelectionProps) {
  return (
    <CheckboxGroup
      value={selectedGroupIds}
      onValueChange={onGroupChange}
      label={
        <span>
          Vyberte skupinu ke které chcete jednotku{" "}
          <strong>&quot;{unit.name}&quot;</strong> přiřadit
        </span>
      }
    >
      {groupData.map((group) => (
        <Checkbox
          key={`unitGroup_${group.idUnitGroup}`}
          name={nameof<UnitGroupModalDTO>("idUnitGroup")}
          value={group.idUnitGroup.toString()}
        >
          {group.unitGroupName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
