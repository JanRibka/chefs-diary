import { Unit, UnitGroup } from "@prisma/client";

export type UnitWithGroupInfoDTO = Pick<Unit, "idUnit" | "name"> & {
  unitGroup: Pick<UnitGroup, "idUnitGroup" | "idBaseUnit" | "name"> | null;
};
