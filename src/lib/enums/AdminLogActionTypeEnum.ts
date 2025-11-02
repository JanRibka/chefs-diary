/**
 * Enum representing different action types that can be logged in admin actions.
 * Used for tracking what type of operation was performed on entities.
 */
export const AdminLogActionTypeEnum = {
  /** Create action type */
  CREATE: "CREATE",

  /** Edit action type */
  EDIT: "EDIT",

  /** Delete action type */
  DELETE: "DELETE",

  /** Add to group action type */
  ADD_TO_GROUP: "ADD_TO_GROUP",

  /** Delete from group action type */
  DELETE_FROM_GROUP: "DELETE_FROM_GROUP",
} as const;

/**
 * Type representing the values of AdminLogActionTypeEnum
 */
export type AdminLogActionTypeEnum =
  (typeof AdminLogActionTypeEnum)[keyof typeof AdminLogActionTypeEnum];
