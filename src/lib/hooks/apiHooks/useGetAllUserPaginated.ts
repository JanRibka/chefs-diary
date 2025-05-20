"use client";

import { useEffect, useState } from "react";

import { PaginatedDTO } from "@/lib/dTOs/admin/shared/PaginatedDTO";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import getAllUsers from "@/lib/services/usersService";

export default function useGetAllUserPaginated(page: number, pageSize: number) {
  const [data, setData] = useState<PaginatedDTO<UserWithStatsDTO>>({
    data: [],
    totalCount: 0,
    page,
    pageSize,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      try {
        //TODO: TOto mus9m volat se server komponenty
        const data = await getAllUsers(page, pageSize);
        if (!cancelled) {
          setData(data);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize]);

  return { data, isLoading };
}
