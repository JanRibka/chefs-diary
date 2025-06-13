import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitWithGroupInfoDTO = Pick<Unit, "idUnit" | "name"> & {
  unitGroupUnit: (Pick<
    UnitGroupUnit,
    "idUnitGroup" | "idUnit" | "isBaseUnit"
  > & {
    unitGroup: Pick<UnitGroup, "idBaseUnit" | "name"> | null;
  })[];
};
