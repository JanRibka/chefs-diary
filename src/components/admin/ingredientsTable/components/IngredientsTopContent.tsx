import { memo } from "react";

import TableTopContent from "@/components/shared/table/topContent/TableTopContent";
import TableTopContentActions from "@/components/shared/table/topContent/TableTopContentActions";
import TableTopContentAddButton from "@/components/shared/table/topContent/TableTopContentAddButton";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

type Props = {
  onPressInsertIngredient: () => void;
};

const IngredientsTopContent = memo(({ onPressInsertIngredient }: Props) => {
  return (
    <TableTopContent>
      <TableTopContentActions>
        <TableTopContentAddButton
          color="primary"
          label="Přidat ingredienci"
          onPress={onPressInsertIngredient}
          requiredPermissions={[PermissionTypeEnum.INGREDIENT_EDIT]}
        />
      </TableTopContentActions>
    </TableTopContent>
  );
});

IngredientsTopContent.displayName = "IngredientsTopContent";

export default IngredientsTopContent;
