import { memo } from "react";

import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

import { GROUP_SELECTION_CONFIG } from "../constants";
import { GroupSelectionProps } from "../types";

const GroupSelectionSection = memo<GroupSelectionProps>(
  ({ unit, groupData, selectedGroupIds, onGroupChange }) => {
    return (
      <CheckboxGroup
        value={selectedGroupIds}
        onValueChange={onGroupChange}
        label={GROUP_SELECTION_CONFIG.labels.checkboxGroup(unit.name)}
      >
        {groupData.map((group) => (
          <Checkbox
            key={GROUP_SELECTION_CONFIG.keys.checkbox(group.idUnitGroup)}
            name={nameof<UnitGroupModalDTO>("idUnitGroup")}
            value={group.idUnitGroup.toString()}
          >
            {group.unitGroupName}
          </Checkbox>
        ))}
      </CheckboxGroup>
    );
  }
);

GroupSelectionSection.displayName = "GroupSelectionSection";

export default GroupSelectionSection;
