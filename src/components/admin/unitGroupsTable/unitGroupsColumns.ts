import TableColumnType from "@/lib/types/common/TableColumnType";

function getUnitGroupsColumns(canEditOrDelete: boolean): TableColumnType[] {
  const columns: TableColumnType[] = [
    {
      label: "Název skupiny",
      key: "name",
      allowsSorting: true,
    },
  ];

  if (canEditOrDelete) {
    columns.push({
      label: "Akce",
      key: "actions",
      width: 100,
    });
  }

  return columns;
}

export default getUnitGroupsColumns;
