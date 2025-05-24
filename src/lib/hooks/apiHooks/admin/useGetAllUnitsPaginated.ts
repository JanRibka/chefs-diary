"use client";

import { useEffect, useState } from "react";

import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { logConsoleError } from "@/lib/utils/console";
import { addToast, SortDescriptor } from "@heroui/react";
import { Unit } from "@prisma/client";

export default function useGeAllUnitsPaginated(
  page: number,
  pageSize: number,
  sortDescriptor: SortDescriptor
) {
  const [data, setData] = useState<PaginatedDTO<Unit>>({
    data: [],
    totalCount: 0,
    page,
    pageSize,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUnits() {
      if (!isLoading) setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (sortDescriptor.column) {
          params.append("orderByField", sortDescriptor.column.toString());

          if (sortDescriptor.direction === "ascending") {
            params.append("orderDirection", "asc");
          } else if (sortDescriptor.direction === "descending") {
            params.append("orderDirection", "desc");
          }
        }

        const response = await fetch(`/admin/jednotky/api?${params}`);

        if (!response.ok) {
          //TODO: Toast bude v komponente
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
        logConsoleError(error, { consoleErrorTitle: "GetAllUnits" });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sortDescriptor.column, sortDescriptor.direction]);

  return { data, isLoading };
}
