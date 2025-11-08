import { memo } from "react";

import { IngredientGroupModalDTO } from "@/lib/dTOs/admin/IngredientGroupModalDTO";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

import { GroupSelectionProps } from "../types/addIngredientToGroupModalContent";

const GroupSelectionSection = memo<GroupSelectionProps>(
  ({ ingredient, groupData, selectedGroupIds, onGroupChange }) => {
    return (
      <CheckboxGroup
        value={selectedGroupIds}
        onValueChange={onGroupChange}
        label={
          <span>
            Vyberte skupinu ke které chcete ingredienci{" "}
            <strong>&quot;{ingredient.name}&quot;</strong> přiřadit
          </span>
        }
      >
        {groupData.map((group) => (
          <Checkbox
            key={`ingredientGroup_${group.idIngredientGroup}`}
            name={nameof<IngredientGroupModalDTO>("idIngredientGroup")}
            value={group.idIngredientGroup.toString()}
          >
            {group.ingredientGroupName}
          </Checkbox>
        ))}
      </CheckboxGroup>
    );
  }
);

GroupSelectionSection.displayName = "GroupSelectionSection";

export default GroupSelectionSection;
