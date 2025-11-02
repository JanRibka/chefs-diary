import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { AdminLogActionTypeEnum } from "@/lib/enums/AdminLogActionTypeEnum";
import { AdminLogEntityTypeEnum } from "@/lib/enums/AdminLogEntityTypeEnum";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { getActualTime } from "@/lib/utils/date";
import {
  getConflictErrorFromError,
  getErrorMessageFromError,
  getNotFoundErrorFromError,
} from "@/lib/utils/error";
import { getRequireAdminPermissions } from "@/lib/utils/server";

/**
 * Helper function to handle common error patterns in action catch blocks
 */
export function handleActionError(
  error: unknown,
  options: {
    conflictMessage?: string;
    notFoundMessage?: string;
  } = {}
): string {
  const { conflictMessage, notFoundMessage } = options;

  // Check for conflict error first
  if (conflictMessage) {
    const conflictError = getConflictErrorFromError(error, conflictMessage);
    if (conflictError.isConflictError) {
      return conflictError.errorMessage;
    }
  }

  // Check for not found error
  if (notFoundMessage) {
    const notFoundError = getNotFoundErrorFromError(error, notFoundMessage);
    if (notFoundError.isNotFoundError) {
      return notFoundError.errorMessage;
    }
  }

  // Default error message
  return getErrorMessageFromError(error);
}

/**
 * Helper function to create success action response
 */
export function createSuccessResponse<T>(data: T): ActionResponseDTO<T> {
  return {
    data,
    success: true,
    timeStamp: getActualTime(),
  };
}

/**
 * Helper function to create error action response
 */
export function createErrorResponse<T>(
  errorMessage: string
): ActionResponseDTO<T> {
  return {
    data: null,
    success: false,
    error: errorMessage,
    timeStamp: getActualTime(),
  };
}

/**
 * Generic wrapper for actions that don't require validation
 */
export async function executeAction<T>(
  permissions: PermissionTypeEnum[],
  serviceCall: () => Promise<T>,
  errorOptions: {
    conflictMessage?: string;
    notFoundMessage?: string;
  } = {}
): Promise<ActionResponseDTO<T>> {
  await getRequireAdminPermissions(permissions);

  try {
    const data = await serviceCall();
    return createSuccessResponse(data);
  } catch (error) {
    const errorMessage = handleActionError(error, errorOptions);
    return createErrorResponse(errorMessage);
  }
}

/**
 * Generic helper for creating entities with validation and logging
 */
export async function createEntity<T>(
  getByName: (name: string) => Promise<T | null>,
  insert: (name: string) => Promise<T>,
  logAdminAction: (
    action: AdminLogActionTypeEnum,
    entityType: AdminLogEntityTypeEnum,
    entityId: number,
    data: Record<string, unknown>
  ) => void,
  entityType: AdminLogEntityTypeEnum,
  getEntityId: (entity: T) => number,
  name: string
): Promise<T> {
  // Check if entity with this name already exists
  const existingEntity = await getByName(name);
  if (existingEntity) {
    const ConflictError = (await import("../errors/ConflictError")).default;
    throw new ConflictError();
  }

  // Insert new entity
  const insertedEntity = await insert(name);

  // Log admin action
  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    entityType,
    getEntityId(insertedEntity),
    { name }
  );

  return insertedEntity;
}

/**
 * Generic helper for updating entities with validation and logging
 */
export async function updateEntity<T>(
  getById: (id: number) => Promise<T | null>,
  update: (id: number, name: string) => Promise<T>,
  logAdminAction: (
    action: AdminLogActionTypeEnum,
    entityType: AdminLogEntityTypeEnum,
    entityId: number,
    data: Record<string, unknown>
  ) => void,
  entityType: AdminLogEntityTypeEnum,
  id: number,
  name: string
): Promise<T> {
  // Check if entity exists
  const existingEntity = await getById(id);
  if (!existingEntity) {
    const NotFoundError = (await import("../errors/NotFoundError")).default;
    throw new NotFoundError();
  }

  // Log admin action
  logAdminAction(AdminLogActionTypeEnum.EDIT, entityType, id, { name });

  // Update entity
  return await update(id, name);
}

/**
 * Generic helper for deleting entities with validation and logging
 */
export async function deleteEntity(
  getById: (id: number) => Promise<unknown | null>,
  deleteFn: (id: number) => Promise<void>,
  logAdminAction: (
    action: AdminLogActionTypeEnum,
    entityType: AdminLogEntityTypeEnum,
    entityId: number,
    data?: Record<string, unknown>
  ) => void,
  entityType: AdminLogEntityTypeEnum,
  id: number
): Promise<void> {
  // Check if entity exists
  const existingEntity = await getById(id);
  if (!existingEntity) {
    const NotFoundError = (await import("../errors/NotFoundError")).default;
    throw new NotFoundError();
  }

  // Log admin action
  logAdminAction(AdminLogActionTypeEnum.DELETE, entityType, id);

  // Delete entity
  await deleteFn(id);
}

/**
 * Validates that an entity name doesn't conflict with existing entities
 */
export async function validateNameConflict<T>(
  getByName: (name: string) => Promise<T | null>,
  name: string,
  excludeId?: number,
  getEntityId?: (entity: T) => number
): Promise<void> {
  const existingEntity = await getByName(name);
  if (existingEntity) {
    if (excludeId && getEntityId && getEntityId(existingEntity) === excludeId) {
      // Same entity, no conflict
      return;
    }
    const ConflictError = (await import("../errors/ConflictError")).default;
    throw new ConflictError();
  }
}
