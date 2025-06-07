export type UnitGroupModalDTO = {
  idUnitGroup: number;
  unitGroupName: string;
  idBaseUnit: number | null;
  isBaseUnit: boolean;
  baseUnitName: string | null;
  idsUnit: number[] | null;
};
