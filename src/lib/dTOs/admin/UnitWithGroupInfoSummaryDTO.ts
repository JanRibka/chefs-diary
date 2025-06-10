import { Unit } from "@prisma/client";

export type UnitWithGroupInfoSummaryDTO = Pick<Unit, "idUnit" | "name"> & {
  unitGroupNames: string | null;
  isBaseUnitInGroup: string | null;
};
