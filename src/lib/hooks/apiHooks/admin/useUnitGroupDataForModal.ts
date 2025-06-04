import { useEffect, useState } from "react";

import { getUnitGroupDataForModalAction } from "@/actions/admin/units";
import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import addToast from "@/lib/utils/addToast";
import { logConsoleError } from "@/lib/utils/console";

export default function useUnitGroupDataForModalAction(idUnit: number) {
  const [data, setData] = useState<UnitGroupModalDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllUsersTableData() {
      if (!isLoading) setIsLoading(true);
      const response = await getUnitGroupDataForModalAction(idUnit);

      if (!response.success) {
        addToast("Chyba", response.error as string, "danger");
      }

      setData(response.data ?? []);
      try {
      } catch (error) {
        logConsoleError(error, {
          consoleErrorTitle: "GetUnitGroupDataForModalAction",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllUsersTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUnit]);

  return { data, isLoading };
}
