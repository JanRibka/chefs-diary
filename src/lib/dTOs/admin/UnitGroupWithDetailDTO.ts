import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitGroupWithDetailDTO = Pick<UnitGroup, "idUnitGroup" | "name"> & {
  unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit"> & {
    unit: Pick<Unit, "idUnit" | "name">;
  })[];
};
