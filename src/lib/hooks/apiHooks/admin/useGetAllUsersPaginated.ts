"use client";

import { useEffect, useState } from "react";

import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { logConsoleError } from "@/lib/utils/console";
import { addToast, SortDescriptor } from "@heroui/react";

export default function useGetAllUserPaginated(
  page: number,
  pageSize: number,
  filterValue: string,
  sortDescriptor: SortDescriptor
) {
  const [data, setData] = useState<PaginatedDTO<UserWithStatsDTO>>({
    data: [],
    totalCount: 0,
    page,
    pageSize,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      if (!isLoading) setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          filterValue: filterValue,
        });

        if (sortDescriptor.column) {
          params.append("orderByField", sortDescriptor.column.toString());

          if (sortDescriptor.direction === "ascending") {
            params.append("orderDirection", "asc");
          } else if (sortDescriptor.direction === "descending") {
            params.append("orderDirection", "desc");
          }
        }

        const response = await fetch(`/admin/vsichni-uzivatele/api?${params}`);

        if (!response.ok) {
          //TODO: Pokud bude statusText Unathorized, nebo forbidden, tak z knihovny pres getErrorText nacty hl83ky
          addToast({
            title: "Chyba",
            description: response.statusText,
            color: "danger",
          });
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        logConsoleError(error, { consoleErrorTitle: "GetAllUsers" });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    pageSize,
    filterValue,
    sortDescriptor.column,
    sortDescriptor.direction,
  ]);

  return { data, isLoading };
}
