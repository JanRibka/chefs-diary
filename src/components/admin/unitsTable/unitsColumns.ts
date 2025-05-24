import TableColumnType from "@/lib/types/common/TableColumnType";

const unitsColumns: TableColumnType[] = [
  {
    label: "Název jednotky",
    key: "name",
    allowsSorting: true,
  },
  {
    label: "Zobrazované jméno",
    key: "displayName",
  },
  {
    label: "Akce",
    key: "actions",
    align: "center",
  },
];

export default unitsColumns;
