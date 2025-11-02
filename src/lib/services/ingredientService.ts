import { Ingredient, IngredientGroup } from "@prisma/client";

import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { IngredientWithAssignedGroupDTO } from "../dTOs/admin/IngredientWithAssignedGroupDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import { AdminLogActionTypeEnum } from "../enums/AdminLogActionTypeEnum";
import { AdminLogEntityTypeEnum } from "../enums/AdminLogEntityTypeEnum";
import { ingredientRepository } from "../repositories/ingredientRepository";
import {
  createEntity,
  deleteEntity,
  validateNameConflict,
} from "../utils/actionHelpers";
import { logAdminAction } from "./adminLogService";

/**
 * Retrieves all ingredient groups with their assigned ingredients.
 *
 * @returns {Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>}
 *          Paginated list of ingredient groups with assigned ingredients and total count.
 */
export async function getIngredientUnitGroupWithAssignedIngredients(): Promise<
  PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>
> {
  return await ingredientRepository.getIngredientUnitGroupWithAssignedIngredients();
}

/**
 * Attempts to insert a new ingredient group with the given name.
 * Throws a ConflictError if an ingredient group with the same name already exists.
 *
 * @param name - The name of the ingredient group to insert.
 * @returns {Promise<IngredientGroup>}
 * @throws {ConflictError} If an ingredient group with the same name already exists.
 */
export async function attemptInsertIngredientGroup(
  name: string
): Promise<IngredientGroup> {
  return await createEntity(
    ingredientRepository.getIngredientGroupByName,
    ingredientRepository.insertIngredientGroup,
    logAdminAction,
    AdminLogEntityTypeEnum.INGREDIENT_GROUP,
    (entity) => entity.idIngredientGroup,
    name
  );
}

/**
 * Attempts to edit an ingredient group with the given ID and new name.
 * Throws a NotFoundError if the ingredient group doesn't exist.
 * Throws a ConflictError if an ingredient group with the same name already exists.
 *
 * @param idIngredientGroup - The ID of the ingredient group to edit.
 * @param name - The new name for the ingredient group.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the ingredient group with the given ID doesn't exist.
 * @throws {ConflictError} If an ingredient group with the same name already exists.
 */
export async function attemptEditIngredientGroup(
  idIngredientGroup: number,
  name: string
): Promise<void> {
  // Check if entity exists
  const existingEntity = await ingredientRepository.getIngredientGroupById(
    idIngredientGroup
  );
  if (!existingEntity) {
    const NotFoundError = (await import("../errors/NotFoundError")).default;
    throw new NotFoundError();
  }

  // Validate name conflict
  await validateNameConflict(
    ingredientRepository.getIngredientGroupByName,
    name,
    idIngredientGroup,
    (entity) => entity.idIngredientGroup
  );

  // Log admin action
  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.INGREDIENT_GROUP,
    idIngredientGroup,
    { name }
  );

  // Update entity
  await ingredientRepository.updateIngredientGroup(idIngredientGroup, name);
}

/**
 * Attempts to delete an ingredient group with the given ID.
 * Throws a NotFoundError if the ingredient group doesn't exist.
 *
 * @param idIngredientGroup - The ID of the ingredient group to delete.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the ingredient group with the given ID doesn't exist.
 */
export async function attemptDeleteIngredientGroup(
  idIngredientGroup: number
): Promise<void> {
  await deleteEntity(
    ingredientRepository.getIngredientGroupById,
    ingredientRepository.deleteIngredientGroup,
    logAdminAction,
    AdminLogEntityTypeEnum.INGREDIENT_GROUP,
    idIngredientGroup
  );
}

/**
 * Retrieves all ingredients with their assigned groups.
 *
 * @returns {Promise<PaginatedDTO<IngredientWithAssignedGroupDTO>>}
 *          Paginated list of ingredients with their assigned groups and total count.
 */
export async function getIngredientsWithAssignedGroups(): Promise<
  PaginatedDTO<IngredientWithAssignedGroupDTO>
> {
  return await ingredientRepository.getIngredientsWithAssignedGroups();
}

/**
 * Attempts to insert a new ingredient with the given name.
 * Throws a ConflictError if an ingredient with the same name already exists.
 *
 * @param name - The name of the ingredient to insert.
 * @returns {Promise<Ingredient>}
 * @throws {ConflictError} If an ingredient with the same name already exists.
 */
export async function attemptInsertIngredient(
  name: string
): Promise<Ingredient> {
  return await createEntity(
    ingredientRepository.getIngredientByName,
    ingredientRepository.insertIngredient,
    logAdminAction,
    AdminLogEntityTypeEnum.INGREDIENT,
    (entity) => entity.idIngredient,
    name
  );
}

/**
 * Attempts to delete an ingredient with the given ID.
 * Throws a NotFoundError if the ingredient doesn't exist.
 *
 * @param idIngredient - The ID of the ingredient to delete.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the ingredient with the given ID doesn't exist.
 */
export async function attemptDeleteIngredient(
  idIngredient: number
): Promise<void> {
  await deleteEntity(
    ingredientRepository.getIngredientById,
    ingredientRepository.deleteIngredient,
    logAdminAction,
    AdminLogEntityTypeEnum.INGREDIENT,
    idIngredient
  );
}

/**
 * Attempts to edit an ingredient with the given ID and new name.
 * Throws a NotFoundError if the ingredient doesn't exist.
 * Throws a ConflictError if an ingredient with the same name already exists.
 *
 * @param idIngredient - The ID of the ingredient to edit.
 * @param name - The new name for the ingredient.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the ingredient with the given ID doesn't exist.
 * @throws {ConflictError} If an ingredient with the same name already exists.
 */
export async function attemptEditIngredient(
  idIngredient: number,
  name: string
): Promise<void> {
  // Check if entity exists
  const existingEntity = await ingredientRepository.getIngredientById(
    idIngredient
  );
  if (!existingEntity) {
    const NotFoundError = (await import("../errors/NotFoundError")).default;
    throw new NotFoundError();
  }

  // Validate name conflict
  await validateNameConflict(
    ingredientRepository.getIngredientByName,
    name,
    idIngredient,
    (entity) => entity.idIngredient
  );

  // Log admin action
  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.INGREDIENT,
    idIngredient,
    { name }
  );

  // Update entity
  await ingredientRepository.updateIngredient(idIngredient, name);
}

/**
 * Ingredient service object containing all ingredient and ingredient group business logic operations.
 *
 * Provides a centralized interface for ingredient-related business operations including
 * CRUD operations, validation, conflict checking, and admin action logging.
 * All operations handle errors appropriately and maintain data consistency.
 */
export const ingredientService = {
  getIngredientUnitGroupWithAssignedIngredients,
  attemptInsertIngredientGroup,
  attemptEditIngredientGroup,
  attemptDeleteIngredientGroup,
  getIngredientsWithAssignedGroups,
  attemptInsertIngredient,
  attemptDeleteIngredient,
  attemptEditIngredient,
} as const;
