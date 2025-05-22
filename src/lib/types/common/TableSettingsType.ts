import { Selection } from "@heroui/react";

type TableSettingsType = {
  page: number;
  pageSize: number;
  filterValue: string;
  visibleColumns: Selection;
  //   "sortBy": "createdAt",
  // "sortOrder": "desc",
};

export default TableSettingsType;
