import { Ingredient, IngredientGroup } from "@prisma/client";

export type IngredientGroupsWithAssignmentsDTO = Pick<
  IngredientGroup,
  "idIngredientGroup" | "name"
> & {
  ingredient: Pick<Ingredient, "idIngredient" | "name">[];
};
