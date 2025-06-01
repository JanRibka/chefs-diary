import { Key } from "react";

import TableCellActions from "@/components/shared/tableCellActions/TableCellActions";
import { UnitGroup } from "@prisma/client";

type UnitGroupActions = keyof UnitGroup | "actions";

export function unitGroupsRenderCell(
  group: UnitGroup,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (group: UnitGroup) => void,
  onDelete: (group: UnitGroup) => void
) {
  const cellValue = group[columnKey as keyof UnitGroup];

  switch (columnKey as UnitGroupActions) {
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
