import { Ingredient } from "@prisma/client";

export type IngredientWithAssignedGroupRawDTO = Pick<
  Ingredient,
  "idIngredient" | "name"
> & {
  group: {
    name: string;
  } | null;
};
