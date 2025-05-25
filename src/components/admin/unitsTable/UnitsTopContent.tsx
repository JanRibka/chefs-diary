"use client";

import { memo } from "react";
import { FaPlus } from "react-icons/fa6";

import Button from "@/components/shared/button/Button";

type Props = {
  onPressInsertUnit: () => void;
};

const UnitsTopContent = memo(({ onPressInsertUnit }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          color="primary"
          endContent={<FaPlus />}
          onPress={onPressInsertUnit}
        >
          Přidat jednotku
        </Button>
      </div>
    </div>
  );
});

UnitsTopContent.displayName = "UnitsTopContent";

export default UnitsTopContent;
