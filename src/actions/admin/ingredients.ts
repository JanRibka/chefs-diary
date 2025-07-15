"use server";

import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { ingredientService } from "@/lib/repositories/ingredientService";
import { getActualTime } from "@/lib/utils/date";
import { getErrorMessageFromError } from "@/lib/utils/error";
import { getRequireAdminPermissions } from "@/lib/utils/server";

export async function getIngredientUnitGroupWithAssignedIngredientsAction(): Promise<
  ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const data =
      await ingredientService.getIngredientUnitGroupWithAssignedIngredients();

    return {
      data: data,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}
