import { useMemo } from "react";

import { SortDescriptor } from "@heroui/react";

import useGetAllUnitsPaginated from "./useGetAllUnitsPaginated";

export default function useUnitsTableData(
  page: number,
  pageSize: number,
  sortDescriptor: SortDescriptor
) {
  const { data, isLoading } = useGetAllUnitsPaginated(
    page,
    pageSize,
    sortDescriptor
  );

  const pages = useMemo(
    () => Math.ceil((data.totalCount || 0) / pageSize),
    [data.totalCount, pageSize]
  );

  return { data, isLoading, pages };
}
