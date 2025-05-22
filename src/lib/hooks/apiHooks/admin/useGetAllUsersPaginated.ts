"use client";

import { useEffect, useState } from "react";

import { PaginatedDTO } from "@/lib/dTOs/admin/shared/PaginatedDTO";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import { logConsoleError } from "@/lib/utils/console";
import { addToast } from "@heroui/react";

export default function useGetAllUserPaginated(page: number, pageSize: number) {
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
        });
        const response = await fetch(`/admin/vsichni-uzivatele/api?${params}`);

        if (!response.ok) {
          //TODO: Toast bude v komponente
          //TODO: Pokud bude statusText Unathorized, nebo forbidden, tak z knihovny pres getErrorText nacty hl83ky
          //TODO: Pokud tu vyhledavanu, tak by tu m2l byt debouncing
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
  }, [page, pageSize]);

  return { data, isLoading };
}
