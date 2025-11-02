import { IngredientWithAssignedGroupDTO } from "../dTOs/admin/IngredientWithAssignedGroupDTO";
import { IngredientWithAssignedGroupRawDTO } from "../dTOs/admin/IngredientWithAssignedGroupRawDTO";

/**
 * Transforms raw ingredient data with group object to DTO with groupName string.
 */
export const transformIngredientWithGroup = (
  item: IngredientWithAssignedGroupRawDTO
): IngredientWithAssignedGroupDTO => ({
  ...item,
  groupName: item.group?.name ?? null,
});
