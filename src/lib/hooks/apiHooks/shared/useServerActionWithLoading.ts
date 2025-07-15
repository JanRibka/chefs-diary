import { useEffect, useState, useTransition } from "react";

import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import addToast from "@/lib/utils/addToast";

export function useServerActionWithLoading<T>(
  serverAction: () => Promise<ActionResponseDTO<T>>
) {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<T | null>(null);

  const handleServerAction = () => {
    startTransition(async () => {
      const result = await serverAction();

      if (result.error) {
        addToast("Error", result.error as string, "danger");

        return;
      }

      setData(result.data);
    });
  };

  useEffect(() => {
    handleServerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPending,
    data,
  };
}
