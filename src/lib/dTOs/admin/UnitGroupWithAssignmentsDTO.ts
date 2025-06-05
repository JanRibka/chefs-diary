import { Unit, UnitGroup } from "@prisma/client";

export type UnitGroupsWithAssignmentsDTO = UnitGroup & {
  baseUnit: Pick<Unit, "name"> | null;
};
