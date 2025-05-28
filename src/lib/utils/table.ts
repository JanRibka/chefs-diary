import { Selection } from "@heroui/react";

import TableColumnType from "../types/common/TableColumnType";

/**
 * Get visible columns
 * @param visibleColumns
 * @param columns
 * @returns {TableColumnType[]}
 */
export function getVisibleColumns(
  visibleColumns: Selection,
  columns: TableColumnType[]
): TableColumnType[] {
  if (visibleColumns === "all") return columns;

  return columns.filter((column) =>
    Array.from(visibleColumns).includes(column.key)
  );
}

export function calculatePages(totalCount: number, pageSize: number) {
  return Math.ceil((totalCount || 0) / pageSize);
}
