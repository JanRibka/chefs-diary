import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitGroupsWithAssignmentsDTO = UnitGroup & {
  unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit" | "idUnit"> & {
    unit: Pick<Unit, "name">;
  })[];
};
