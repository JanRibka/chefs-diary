import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitGroupsWithAssignmentsDTO = Pick<
  UnitGroup,
  "idUnitGroup" | "name"
> & {
  baseUnit: Unit | null;
  unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit" | "idUnit"> & {
    unit: Pick<Unit, "name">;
  })[];
};
