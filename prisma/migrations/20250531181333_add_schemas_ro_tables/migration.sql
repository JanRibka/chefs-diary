-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "favorite";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "note";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rating";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "recipe";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "unit";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "favorite"."FavoriteRecipe" (
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "idFavoriteGroup" INTEGER NOT NULL,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("idUser","idRecipe","idFavoriteGroup")
);

-- CreateTable
CREATE TABLE "favorite"."FavoriteRecipeGroup" (
    "idFavoriteGroup" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipeGroup_pkey" PRIMARY KEY ("idFavoriteGroup")
);

-- CreateTable
CREATE TABLE "recipe"."Ingredient" (
    "idIngredient" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("idIngredient")
);

-- CreateTable
CREATE TABLE "auth"."PasswordResetToken" (
    "idPasswordResetToken" SERIAL NOT NULL,
    "identifier" VARCHAR(25) NOT NULL,
    "token" VARCHAR(36) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("idPasswordResetToken")
);

-- CreateTable
CREATE TABLE "auth"."Permission" (
    "idPermission" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" VARCHAR(35) NOT NULL,
    "value" SMALLINT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("idPermission")
);

-- CreateTable
CREATE TABLE "recipe"."Recipe" (
    "idRecipe" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("idRecipe")
);

-- CreateTable
CREATE TABLE "recipe"."RecipeImage" (
    "idRecipeImage" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "RecipeImage_pkey" PRIMARY KEY ("idRecipeImage")
);

-- CreateTable
CREATE TABLE "recipe"."RecipeIngredient" (
    "idRecipeIngredient" SERIAL NOT NULL,
    "idIngredientGroup" INTEGER NOT NULL,
    "idIngredient" INTEGER NOT NULL,
    "idUnit" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("idRecipeIngredient")
);

-- CreateTable
CREATE TABLE "recipe"."RecipeIngredientGroup" (
    "idIngredientGroup" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "RecipeIngredientGroup_pkey" PRIMARY KEY ("idIngredientGroup")
);

-- CreateTable
CREATE TABLE "note"."RecipeNote" (
    "idNote" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeNote_pkey" PRIMARY KEY ("idNote")
);

-- CreateTable
CREATE TABLE "rating"."RecipeRating" (
    "idRating" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "rating" SMALLINT NOT NULL,

    CONSTRAINT "RecipeRating_pkey" PRIMARY KEY ("idRating")
);

-- CreateTable
CREATE TABLE "recipe"."RecipeStep" (
    "idRecipeStep" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "stepNumber" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("idRecipeStep")
);

-- CreateTable
CREATE TABLE "auth"."RolePermission" (
    "idUserRoleType" INTEGER NOT NULL,
    "idPermission" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("idUserRoleType","idPermission")
);

-- CreateTable
CREATE TABLE "auth"."Session" (
    "idSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("idSession")
);

-- CreateTable
CREATE TABLE "auth"."SessionAdmin" (
    "idSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "SessionAdmin_pkey" PRIMARY KEY ("idSession")
);

-- CreateTable
CREATE TABLE "unit"."Unit" (
    "idUnit" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "displayName" VARCHAR(10) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("idUnit")
);

-- CreateTable
CREATE TABLE "unit"."UnitConversion" (
    "idUnitConversion" SERIAL NOT NULL,
    "idFromUnit" INTEGER NOT NULL,
    "idToUnit" INTEGER NOT NULL,
    "factor" REAL NOT NULL,

    CONSTRAINT "UnitConversion_pkey" PRIMARY KEY ("idUnitConversion")
);

-- CreateTable
CREATE TABLE "unit"."UnitGroup" (
    "idUnitGroup" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "UnitGroup_pkey" PRIMARY KEY ("idUnitGroup")
);

-- CreateTable
CREATE TABLE "unit"."UnitGroupUnit" (
    "idUnitGroupUnit" SERIAL NOT NULL,
    "isBaseUnit" BOOLEAN NOT NULL DEFAULT false,
    "idUnitGroup" INTEGER NOT NULL,
    "idUnit" INTEGER NOT NULL,

    CONSTRAINT "UnitGroupUnit_pkey" PRIMARY KEY ("idUnitGroupUnit")
);

-- CreateTable
CREATE TABLE "user"."User" (
    "idUser" VARCHAR(25) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isDisabled" BOOLEAN DEFAULT false,
    "webLoginRestrictedUntil" TIMESTAMP(0),
    "adminLoginRestrictedUntil" TIMESTAMP(0),
    "twoFactor" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "user"."UserActionLog" (
    "idUserActionLog" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "action" VARCHAR(20) NOT NULL,
    "targetId" VARCHAR(25),
    "targetType" VARCHAR(30) NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" TEXT,

    CONSTRAINT "UserActionLog_pkey" PRIMARY KEY ("idUserActionLog")
);

-- CreateTable
CREATE TABLE "user"."UserInfo" (
    "idUserInfo" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "userName" VARCHAR(25),
    "email" VARCHAR(50) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(0),
    "phone" VARCHAR(25),
    "imageUrl" VARCHAR(255),
    "firstName" VARCHAR(25),
    "lastName" VARCHAR(25),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("idUserInfo")
);

-- CreateTable
CREATE TABLE "user"."UserLoginHistory" (
    "idUserLogHistory" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "authMode" VARCHAR(5) NOT NULL,
    "loginAttemptDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginSuccessful" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserLoginHistory_pkey" PRIMARY KEY ("idUserLogHistory")
);

-- CreateTable
CREATE TABLE "user"."UserPermissionOverride" (
    "idUser" VARCHAR(25) NOT NULL,
    "idPermission" INTEGER NOT NULL,
    "allow" BOOLEAN NOT NULL,

    CONSTRAINT "UserPermissionOverride_pkey" PRIMARY KEY ("idUser","idPermission")
);

-- CreateTable
CREATE TABLE "auth"."UserRole" (
    "idUser" VARCHAR(25) NOT NULL,
    "idUserRoleType" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("idUser","idUserRoleType")
);

-- CreateTable
CREATE TABLE "auth"."UserRoleType" (
    "idUserRoleType" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "value" SMALLINT NOT NULL,
    "description" VARCHAR(20) NOT NULL,

    CONSTRAINT "UserRoleType_pkey" PRIMARY KEY ("idUserRoleType")
);

-- CreateTable
CREATE TABLE "auth"."VerificationToken" (
    "idVerificationToken" SERIAL NOT NULL,
    "identifier" VARCHAR(25) NOT NULL,
    "token" VARCHAR(36) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("idVerificationToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "recipe"."Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "auth"."PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_code_key" ON "auth"."Permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_value_key" ON "auth"."Permission"("value");

-- CreateIndex
CREATE INDEX "RecipeImage_idRecipe_idx" ON "recipe"."RecipeImage"("idRecipe");

-- CreateIndex
CREATE INDEX "RecipeImage_idUser_idx" ON "recipe"."RecipeImage"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeRating_idUser_idRecipe_key" ON "rating"."RecipeRating"("idUser", "idRecipe");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_idRecipe_stepNumber_key" ON "recipe"."RecipeStep"("idRecipe", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "auth"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAdmin_sessionToken_key" ON "auth"."SessionAdmin"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "unit"."Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnitConversion_idFromUnit_idToUnit_key" ON "unit"."UnitConversion"("idFromUnit", "idToUnit");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroup_name_key" ON "unit"."UnitGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroupUnit_idUnitGroup_idUnit_key" ON "unit"."UnitGroupUnit"("idUnitGroup", "idUnit");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroupUnit_idUnitGroup_isBaseUnit_key" ON "unit"."UnitGroupUnit"("idUnitGroup", "isBaseUnit");

-- CreateIndex
CREATE INDEX "UserActionLog_idUser_idx" ON "user"."UserActionLog"("idUser");

-- CreateIndex
CREATE INDEX "UserActionLog_action_idx" ON "user"."UserActionLog"("action");

-- CreateIndex
CREATE INDEX "UserActionLog_targetType_targetId_idx" ON "user"."UserActionLog"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_idUser_key" ON "user"."UserInfo"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_email_key" ON "user"."UserInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_phone_key" ON "user"."UserInfo"("phone");

-- CreateIndex
CREATE INDEX "UserLoginHistory_idUser_loginSuccessful_loginAttemptDate_au_idx" ON "user"."UserLoginHistory"("idUser", "loginSuccessful", "loginAttemptDate", "authMode");

-- CreateIndex
CREATE INDEX "UserRole_idUser_idx" ON "auth"."UserRole"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_code_key" ON "auth"."UserRoleType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_value_key" ON "auth"."UserRoleType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_key" ON "auth"."VerificationToken"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "auth"."VerificationToken"("token");

-- AddForeignKey
ALTER TABLE "favorite"."FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite"."FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite"."FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idFavoriteGroup_fkey" FOREIGN KEY ("idFavoriteGroup") REFERENCES "favorite"."FavoriteRecipeGroup"("idFavoriteGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite"."FavoriteRecipeGroup" ADD CONSTRAINT "FavoriteRecipeGroup_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."Recipe" ADD CONSTRAINT "Recipe_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeImage" ADD CONSTRAINT "RecipeImage_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeImage" ADD CONSTRAINT "RecipeImage_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idIngredientGroup_fkey" FOREIGN KEY ("idIngredientGroup") REFERENCES "recipe"."RecipeIngredientGroup"("idIngredientGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idIngredient_fkey" FOREIGN KEY ("idIngredient") REFERENCES "recipe"."Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idUnit_fkey" FOREIGN KEY ("idUnit") REFERENCES "unit"."Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeIngredientGroup" ADD CONSTRAINT "RecipeIngredientGroup_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note"."RecipeNote" ADD CONSTRAINT "RecipeNote_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note"."RecipeNote" ADD CONSTRAINT "RecipeNote_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating"."RecipeRating" ADD CONSTRAINT "RecipeRating_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating"."RecipeRating" ADD CONSTRAINT "RecipeRating_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe"."RecipeStep" ADD CONSTRAINT "RecipeStep_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "recipe"."Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."RolePermission" ADD CONSTRAINT "RolePermission_idUserRoleType_fkey" FOREIGN KEY ("idUserRoleType") REFERENCES "auth"."UserRoleType"("idUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."RolePermission" ADD CONSTRAINT "RolePermission_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "auth"."Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."SessionAdmin" ADD CONSTRAINT "SessionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit"."UnitConversion" ADD CONSTRAINT "UnitConversion_idFromUnit_fkey" FOREIGN KEY ("idFromUnit") REFERENCES "unit"."Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit"."UnitConversion" ADD CONSTRAINT "UnitConversion_idToUnit_fkey" FOREIGN KEY ("idToUnit") REFERENCES "unit"."Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit"."UnitGroupUnit" ADD CONSTRAINT "UnitGroupUnit_idUnitGroup_fkey" FOREIGN KEY ("idUnitGroup") REFERENCES "unit"."UnitGroup"("idUnitGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit"."UnitGroupUnit" ADD CONSTRAINT "UnitGroupUnit_idUnit_fkey" FOREIGN KEY ("idUnit") REFERENCES "unit"."Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."UserActionLog" ADD CONSTRAINT "UserActionLog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."UserInfo" ADD CONSTRAINT "UserInfo_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."UserLoginHistory" ADD CONSTRAINT "UserLoginHistory_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "auth"."Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."UserRole" ADD CONSTRAINT "UserRole_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."UserRole" ADD CONSTRAINT "UserRole_idUserRoleType_fkey" FOREIGN KEY ("idUserRoleType") REFERENCES "auth"."UserRoleType"("idUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;
