/**
 * Enum representing different entity types that can be logged in admin actions.
 * Used for tracking changes to various entities in the system.
 */
export const AdminLogEntityTypeEnum = {
  /** User entity type */
  USER: "USER",

  /** Unit entity type */
  UNIT: "UNIT",

  /** Unit group entity type */
  UNIT_GROUP: "UNIT_GROUP",

  /** Ingredient group entity type */
  INGREDIENT_GROUP: "INGREDIENT_GROUP",

  /** Ingredient entity type */
  INGREDIENT: "INGREDIENT",
} as const;

/**
 * Type representing the values of AdminLogEntityTypeEnum
 */
export type AdminLogEntityTypeEnum =
  (typeof AdminLogEntityTypeEnum)[keyof typeof AdminLogEntityTypeEnum];
