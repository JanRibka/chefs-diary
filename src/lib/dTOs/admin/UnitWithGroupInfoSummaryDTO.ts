import { Unit } from "@prisma/client";

export type UnitWithGroupInfoSummaryDTO = Pick<Unit, "idUnit" | "name"> & {
  unitGroupName: string | null;
  isBaseUnit: boolean | null;
};
