import { Key } from 'react';

import TableCellActions from '@/components/shared/tableCellActions/TableCellActions';
import { UnitGroup } from '@prisma/client';

type UnitGroupActions = keyof UnitGroup | "actions";

export function unitGroupsRenderCell(group: UnitGroup, columnKey: Key) {
  const cellValue = group[columnKey as keyof UnitGroup];

  switch (columnKey as UnitGroupActions) {
    case "actions":
      return (
        <TableCellActions hideDetails editLabel="Editovat skupinu" hideDelete />
      );
    default:
      return cellValue?.toString();
  }
}
