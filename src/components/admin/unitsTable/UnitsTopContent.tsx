"use client";

import { memo } from "react";
import { FaPlus } from "react-icons/fa6";

import Button from "@/components/shared/button/Button";
import HideContentNoPermission from "@/components/shared/layout/hideContentNoPermission/HideContentNoPermission";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

type Props = {
  onPressInsertUnit: () => void;
};

const UnitsTopContent = memo(({ onPressInsertUnit }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <HideContentNoPermission
          allowedPermissions={[PermissionTypeEnum.UNIT_EDIT]}
        >
          <Button
            color="primary"
            endContent={<FaPlus />}
            onPress={onPressInsertUnit}
          >
            Přidat jednotku
          </Button>
        </HideContentNoPermission>
      </div>
    </div>
  );
});

UnitsTopContent.displayName = "UnitsTopContent";

export default UnitsTopContent;
