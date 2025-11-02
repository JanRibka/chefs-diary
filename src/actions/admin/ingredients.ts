"use server";

import { revalidatePath } from "next/cache";

import ingredientActionValidator from "@/lib/actionValidators/admin/ingredientActionValidator";
import ingredientGroupActionValidator from "@/lib/actionValidators/admin/ingredientGroupActionValidator";
import { IngredientGroupModalDTO } from "@/lib/dTOs/admin/IngredientGroupModalDTO";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import { ingredientService } from "@/lib/services/ingredientService";
import {
  createErrorResponse,
  createSuccessResponse,
  executeAction,
  handleActionError,
} from "@/lib/utils/actionHelpers";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { IngredientFormType } from "@/lib/validations/schemas/admin/ingredientFormValidationSchema";
import { IngredientGroupFormType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";
import { Ingredient, IngredientGroup } from "@prisma/client";

/**
 * Retrieves all ingredient groups with their assigned ingredients.
 *
 * Requires INGREDIENT_EDIT permission. Returns paginated results for displaying
 * in data tables or management interfaces.
 *
 * @returns Promise<ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>>
 *          A paginated response with ingredient groups and their ingredients.
 */
export async function getIngredientUnitGroupWithAssignedIngredientsAction(): Promise<
  ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
> {
  return executeAction([PermissionTypeEnum.INGREDIENT_EDIT], () =>
    ingredientService.getIngredientUnitGroupWithAssignedIngredients()
  );
}

/**
 * Creates a new ingredient group.
 *
 * Requires INGREDIENT_EDIT permission. Validates the form data and creates
 * a new ingredient group with the provided name.
 *
 * @param formData - The form data containing the ingredient group name.
 * @returns Promise<ActionResponseDTO<IngredientGroup>> - The created ingredient group or error response.
 */
export async function insertIngredientGroupAction(
  formData: FormData
): Promise<ActionResponseDTO<IngredientGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientGroupActionValidator(formData);

    if (!validationResult.success) {
      return createErrorResponse("Validation failed");
    }

    const name = formData.get(
      nameof<IngredientGroupFormType>("name")
    ) as string;
    const unitGroup = await ingredientService.attemptInsertIngredientGroup(
      name
    );

    return createSuccessResponse(unitGroup);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      conflictMessage: "Skupina ingrediencí již existuje",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Updates an existing ingredient group.
 *
 * Requires INGREDIENT_EDIT permission. Validates the form data and updates
 * the ingredient group with the provided name.
 *
 * @param idIngredientGroup - The ID of the ingredient group to update.
 * @param formData - The form data containing the new ingredient group name.
 * @returns Promise<ActionResponseDTO<null>> - Success response or error response.
 */
export async function updateIngredientGroupAction(
  idIngredientGroup: number,
  formData: FormData
): Promise<ActionResponseDTO<null>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientGroupActionValidator(formData);

    if (!validationResult.success) {
      return createErrorResponse("Validation failed");
    }

    const name = formData.get(
      nameof<IngredientGroupFormType>("name")
    ) as string;

    await ingredientService.attemptEditIngredientGroup(idIngredientGroup, name);

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Skupina ingrediencí neexistuje",
      conflictMessage: "Skupina ingrediencí již existuje",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Retrieves all ingredients with their assigned groups.
 *
 * Requires INGREDIENT_EDIT permission. Returns paginated results for displaying
 * in data tables or management interfaces.
 *
 * @returns Promise<ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>>
 *          A paginated response with ingredients and their groups.
 */
export async function getIngredientsWithAssignedGroupsAction(): Promise<
  ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>
> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const data = await ingredientService.getIngredientsWithAssignedGroups();

    return createSuccessResponse(data);
  } catch (error) {
    const errorMessage = handleActionError(error);
    return createErrorResponse(errorMessage);
  }
}

/**
 * Creates a new ingredient.
 *
 * Requires INGREDIENT_EDIT permission. Validates the form data and creates
 * a new ingredient with the provided name.
 *
 * @param formData - The form data containing the ingredient name.
 * @returns Promise<ActionResponseDTO<Ingredient>> - The created ingredient or error response.
 */
export async function insertIngredientAction(
  formData: FormData
): Promise<ActionResponseDTO<Ingredient>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientActionValidator(formData);

    if (!validationResult.success) {
      return createErrorResponse("Validation failed");
    }

    const name = formData.get(nameof<IngredientFormType>("name")) as string;
    const ingredient = await ingredientService.attemptInsertIngredient(name);

    return createSuccessResponse(ingredient);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      conflictMessage: "Ingredience již existuje",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Deletes an ingredient group.
 *
 * Requires INGREDIENT_DELETE permission. Removes the ingredient group if it exists
 * and has no assigned ingredients.
 *
 * @param idIngredientGroup - The ID of the ingredient group to delete.
 * @returns Promise<ActionResponseDTO<null>> - Success response or error response.
 */
export async function deleteIngredientGroupAction(
  idIngredientGroup: number
): Promise<ActionResponseDTO<null>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_DELETE]);

  try {
    await ingredientService.attemptDeleteIngredientGroup(idIngredientGroup);

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Skupina ingrediencí nelze smazat",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Deletes an ingredient.
 *
 * Requires INGREDIENT_DELETE permission. Removes the ingredient if it exists.
 *
 * @param idIngredient - The ID of the ingredient to delete.
 * @returns Promise<ActionResponseDTO<null>> - Success response or error response.
 */
export async function deleteIngredientAction(
  idIngredient: number
): Promise<ActionResponseDTO<null>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_DELETE]);

  try {
    await ingredientService.attemptDeleteIngredient(idIngredient);

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Ingredience nelze smazat",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Updates an existing ingredient.
 *
 * Requires INGREDIENT_EDIT permission. Validates the form data and updates
 * the ingredient with the provided name.
 *
 * @param idIngredient - The ID of the ingredient to update.
 * @param formData - The form data containing the new ingredient name.
 * @returns Promise<ActionResponseDTO<null>> - Success response or error response.
 */
export async function updateIngredientAction(
  idIngredient: number,
  formData: FormData
): Promise<ActionResponseDTO<null>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientActionValidator(formData);

    if (!validationResult.success) {
      return createErrorResponse("Validation failed");
    }

    const name = formData.get(nameof<IngredientFormType>("name")) as string;

    await ingredientService.attemptEditIngredient(idIngredient, name);

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Ingredience neexistuje",
      conflictMessage: "Ingredience již existuje",
    });
    return createErrorResponse(errorMessage);
  }
}

/**
 * Retrieves ingredient group data for modal display.
 *
 * Requires INGREDIENT_EDIT permission. Returns ingredient groups with assignment info for the specified ingredient.
 *
 * @param idIngredient - The ID of the ingredient to get group data for.
 * @returns Promise<ActionResponseDTO<IngredientGroupModalDTO[]>> - Success response with group data or error response.
 */
export async function getIngredientGroupDataForModalAction(
  idIngredient: number
): Promise<ActionResponseDTO<IngredientGroupModalDTO[]>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const data = await ingredientService.getIngredientGroupDataForModal(
      idIngredient
    );

    return createSuccessResponse(data);
  } catch (error) {
    const errorMessage = handleActionError(error);
    return createErrorResponse(errorMessage);
  }
}

/**
 * Adds an ingredient to an ingredient group.
 *
 * Requires INGREDIENT_EDIT permission. Assigns the ingredient to the specified group.
 *
 * @param idIngredient - The ID of the ingredient to assign.
 * @param formData - The form data containing the ingredient group ID.
 * @returns Promise<ActionResponseDTO<void>> - Success response or error response.
 */
export async function addIngredientToGroupAction(
  idIngredient: number,
  formData: FormData
): Promise<ActionResponseDTO<void>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const idIngredientGroupRaw = formData.get(
      nameof<IngredientGroupModalDTO>("idIngredientGroup")
    );
    const idIngredientGroup =
      idIngredientGroupRaw !== null ? Number(idIngredientGroupRaw) : null;

    await ingredientService.attemptAssignIngredientToGroup(
      idIngredient,
      idIngredientGroup
    );

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Ingredience neexistuje",
    });
    return createErrorResponse(errorMessage);
  } finally {
    revalidatePath(adminRoutes.Ingredients);
  }
}

/**
 * Removes an ingredient from its ingredient group.
 *
 * Requires INGREDIENT_EDIT permission. Unassigns the ingredient from any group.
 *
 * @param idIngredient - The ID of the ingredient to unassign.
 * @returns Promise<ActionResponseDTO<void>> - Success response or error response.
 */
export async function removeIngredientFromGroupAction(
  idIngredient: number
): Promise<ActionResponseDTO<void>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    await ingredientService.attemptAssignIngredientToGroup(idIngredient, null);

    return createSuccessResponse(null);
  } catch (error) {
    const errorMessage = handleActionError(error, {
      notFoundMessage: "Ingredience neexistuje",
    });
    return createErrorResponse(errorMessage);
  } finally {
    revalidatePath(adminRoutes.Ingredients);
  }
}
