import { useMemo } from "react";

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
    () => Math.ceil((data.totalCount || 0) / pageSize),
    [data.totalCount, pageSize]
  );

  return { data, isLoading, pages };
}
