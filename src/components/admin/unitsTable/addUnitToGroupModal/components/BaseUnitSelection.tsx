import { memo } from "react";

import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

import { BASE_UNIT_CONFIG } from "../constants";
import { BaseUnitSectionProps } from "../types";

const BaseUnitSection = memo<BaseUnitSectionProps>(
  ({
    isBaseUnit,
    showBaseUnitWarning,
    baseUnitInSelectedGroup,
    selectedGroupIds,
    onBaseUnitToggle,
  }) => {
    return (
      <CheckboxGroup
        label={BASE_UNIT_CONFIG.labels.checkboxGroup}
        value={isBaseUnit ? [true.toString()] : []}
        onValueChange={onBaseUnitToggle}
      >
        {showBaseUnitWarning && (
          <div className={BASE_UNIT_CONFIG.styles.warning}>
            <p>
              {BASE_UNIT_CONFIG.labels.currentBaseUnit}
              <strong>{baseUnitInSelectedGroup?.name}</strong>
            </p>
            <p>{BASE_UNIT_CONFIG.labels.changeWarning}</p>
          </div>
        )}
        <Checkbox
          value={true.toString()}
          name={nameof<UnitGroupModalDTO>("isBaseUnit")}
          isDisabled={selectedGroupIds.length === 0}
        >
          {BASE_UNIT_CONFIG.labels.checkbox}
        </Checkbox>
      </CheckboxGroup>
    );
  }
);

BaseUnitSection.displayName = "BaseUnitSection";

export default BaseUnitSection;
