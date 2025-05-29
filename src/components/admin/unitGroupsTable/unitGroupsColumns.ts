import TableColumnType from '@/lib/types/common/TableColumnType';

const unitGroupsColumns: TableColumnType[] = [
  {
    label: "Název skupiny",
    key: "name",
    allowsSorting: true,
  },
  {
    label: "Akce",
    key: "actions",
  },
];

export default unitGroupsColumns;
