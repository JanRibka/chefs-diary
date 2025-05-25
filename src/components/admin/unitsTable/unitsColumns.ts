import TableColumnType from "@/lib/types/common/TableColumnType";

const unitsColumns: TableColumnType[] = [
  {
    label: "Název jednotky",
    key: "Name",
    allowsSorting: true,
  },
  {
    label: "Zobrazované jméno",
    key: "DisplayName",
  },
  {
    label: "Akce",
    key: "actions",
    align: "center",
  },
];

export default unitsColumns;
