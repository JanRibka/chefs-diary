enum PermissionTypeEnum {
  USER_VIEW = 1,
  USER_EDIT = 2,
  USER_DELETE = 3,
  ROLE_ASSIGN = 10,
  PERMISSION_EDIT = 20,
  LOG_VIEW = 30,
  POST_APPROVE = 40,
  RECIPE_PUBLISH = 50,
  RECIPE_EDIT = 51,
  RECIPE_DELETE = 52,
  IMAGE_PUBLISH = 60,
  IMAGE_DELETE = 61,
  COMMENT_PUBLISH = 70,
  COMMENT_DELETE = 71,
  RATING_PUBLISH = 80,
  TICKET_VIEW = 90,
  TICKET_MANAGE = 91,
  SETTINGS_EDIT = 100,
  UNIT_VIEW = 110,
  UNIT_EDIT = 111,
  UNIT_DELETE = 112,
}

export default PermissionTypeEnum;
