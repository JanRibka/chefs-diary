import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitWithGroupInfoDTO = Pick<Unit, "idUnit" | "name"> & {
  unitGroupUnit: (Pick<UnitGroupUnit, "idUnitGroup" | "isBaseUnit"> & {
    unitGroup: Pick<UnitGroup, "name"> | null;
  })[];
};
