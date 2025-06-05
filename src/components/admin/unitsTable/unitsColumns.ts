import TableColumnType from "@/lib/types/common/TableColumnType";

function getUnitsColumns(canEditOrDelete: boolean): TableColumnType[] {
  const columns: TableColumnType[] = [
    {
      label: "Název jednotky",
      key: "name",
      allowsSorting: true,
    },
    {
      label: "Je základní jednotka",
      key: "isBaseUnit",
      allowsSorting: true,
    },
    {
      label: "Patří do skupiny",
      key: "unitGroupName",
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

export default getUnitsColumns;
