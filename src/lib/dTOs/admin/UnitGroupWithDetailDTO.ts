import { Unit, UnitGroup } from "@prisma/client";

export type UnitGroupWithDetailDTO = Pick<UnitGroup, "idUnitGroup" | "name"> & {
  baseUnit: Pick<Unit, "name"> | null;
  unit: Pick<Unit, "name">[] | null;
};
