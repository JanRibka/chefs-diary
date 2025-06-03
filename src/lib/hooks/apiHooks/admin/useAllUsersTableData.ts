import { useMemo } from "react";

import { getPages } from "@/lib/utils/table";
import { SortDescriptor } from "@heroui/react";

import useGetAllUserPaginated from "./useGetAllUsersPaginated";

export default function useAllUsersTableData(
  page: number,
  pageSize: number,
  filterValue: string,
  sortDescriptor: SortDescriptor
) {
  const { data, isLoading } = useGetAllUserPaginated(
    page,
    pageSize,
    filterValue,
    sortDescriptor
  );

  const pages = useMemo(
    () => getPages(data.totalCount, pageSize),
    [data.totalCount, pageSize]
  );

  return { data, isLoading, pages };
}
