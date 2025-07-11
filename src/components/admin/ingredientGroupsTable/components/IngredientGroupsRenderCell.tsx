import { Key } from "react";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { IngredientGroup } from "@prisma/client";

type IngredientGroupActions = keyof IngredientGroup | "actions";

export function IngredientGroupsRenderCell(
  group: IngredientGroup,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (group: IngredientGroup) => void,
  onDelete: (group: IngredientGroup) => void
) {
  const cellValue = group[columnKey as keyof IngredientGroup];

  switch (columnKey as IngredientGroupActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          hideDetails
          hideEdit={!canEdit}
          editLabel="Editovat skupinu"
          onEdit={() => onEdit(group)}
          hideDelete={!canDelete}
          deleteLabel="Smazat skupinu"
          onDelete={() => onDelete(group)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
