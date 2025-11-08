import { memo } from "react";

import TableTopContent from "@/components/shared/table/topContent/TableTopContent";
import TableTopContentActions from "@/components/shared/table/topContent/TableTopContentActions";
import TableTopContentAddButton from "@/components/shared/table/topContent/TableTopContentAddButton";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

type Props = {
  onPressInsertGroup: () => void;
};

const IngredientGroupsTopContent = memo(({ onPressInsertGroup }: Props) => {
  return (
    <TableTopContent>
      <TableTopContentActions>
        <TableTopContentAddButton
          color="primary"
          label="Přidat skupinu"
          onPress={onPressInsertGroup}
          requiredPermissions={[PermissionTypeEnum.INGREDIENT_EDIT]}
        />
      </TableTopContentActions>
    </TableTopContent>
  );
});

IngredientGroupsTopContent.displayName = "IngredientGroupsTopContent";

export default IngredientGroupsTopContent;
