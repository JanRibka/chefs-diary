type TableColumnType = {
  key: string;
  label: string;
  align?: "center" | "start" | "end";
  allowsSorting?: boolean;
};

export default TableColumnType;
