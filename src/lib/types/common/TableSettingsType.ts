import { Selection, SortDescriptor } from "@heroui/react";

type TableSettingsType = {
  page: number;
  pageSize: number;
  filterValue?: string;
  visibleColumns?: Selection;
  sortDescriptor?: SortDescriptor;
};

export default TableSettingsType;
