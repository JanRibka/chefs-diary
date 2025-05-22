import { Selection } from "@heroui/react";

import TableColumnType from "../types/common/TableColumnType";

export function getVisibleColumns(
  visibleColumns: Selection,
  columns: TableColumnType[]
): TableColumnType[] {
  if (visibleColumns === "all") return columns;

  return columns.filter((column) =>
    Array.from(visibleColumns).includes(column.key)
  );
}
