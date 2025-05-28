import { useEffect } from "react";

import { ServiceResponseDTO } from "@/lib/dTOs/shared/ServiceResponseDTO";
import { addToast } from "@heroui/react";

type Props<T> = {
  data: ServiceResponseDTO<T>;
};

export default function EvaluateServiceResponseError<T>({ data }: Props<T>) {
  useEffect(() => {
    if (!data.success) {
      addToast({
        title: "Chyba",
        color: "danger",
        description: data.errorMessage,
      });
    }
  }, [data.success, data.errorMessage, data.timeStamp]);

  return null;
}
