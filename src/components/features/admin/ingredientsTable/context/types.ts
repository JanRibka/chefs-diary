import { TableSettings } from "@/lib/types/common/table";
import { SortDescriptor } from "@heroui/react";

export interface IngredientsTableState {
  page: number;
  pageSize: number;
  sortDescriptor: SortDescriptor;
}

export type IngredientsTableActions =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_SORT_DESCRIPTOR"; payload: SortDescriptor }
  | { type: "LOAD_SETTINGS"; payload: TableSettings };

export interface IngredientsTableContextValue {
  state: IngredientsTableState;
  actions: {
    setPage: (value: number) => void;
    setPageSize: (value: number) => void;
    setSortDescriptor: (value: SortDescriptor) => void;
  };
}
