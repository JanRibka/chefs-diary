import { Ingredient, IngredientGroup } from "@prisma/client";

export type IngredientWithAssignedGroupDTO = Omit<
  Ingredient,
  "idIngredientGroup"
> & {
  group: IngredientGroup | null;
};
