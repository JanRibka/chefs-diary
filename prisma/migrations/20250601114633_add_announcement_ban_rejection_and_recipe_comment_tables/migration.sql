/*
  Warnings:

  - Added the required column `idBanReason` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idBanReason` to the `RecipeImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "approvedAt" TIMESTAMP(0),
ADD COLUMN     "bannedAt" TIMESTAMP(0),
ADD COLUMN     "idBanReason" INTEGER NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RecipeImage" ADD COLUMN     "approvedAt" TIMESTAMP(0),
ADD COLUMN     "bannedAt" TIMESTAMP(0),
ADD COLUMN     "idBanReason" INTEGER NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "test" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTrustedAuthor" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "AdminLog" (
    "idAdminLog" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "action" VARCHAR(20) NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "idEntity" INTEGER,
    "changes" JSONB,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("idAdminLog")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "idAnnouncement" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "visibleFrom" TIMESTAMP(0),
    "visibleTo" TIMESTAMP(0),

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("idAnnouncement")
);

-- CreateTable
CREATE TABLE "AnnouncementRead" (
    "idAnnouncementRead" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idAnnouncement" INTEGER NOT NULL,
    "readAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnnouncementRead_pkey" PRIMARY KEY ("idAnnouncementRead")
);

-- CreateTable
CREATE TABLE "BanReason" (
    "idBanReason" SERIAL NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "BanReason_pkey" PRIMARY KEY ("idBanReason")
);

-- CreateTable
CREATE TABLE "RecipeComment" (
    "idRecipeComment" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isReported" BOOLEAN NOT NULL DEFAULT false,
    "idRecipe" INTEGER NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "RecipeComment_pkey" PRIMARY KEY ("idRecipeComment")
);

-- CreateTable
CREATE TABLE "RecipeCommentReport" (
    "idRecipeCommentReport" SERIAL NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRecipeComment" INTEGER NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "RecipeCommentReport_pkey" PRIMARY KEY ("idRecipeCommentReport")
);

-- CreateTable
CREATE TABLE "Rejection" (
    "idRejection" SERIAL NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRecipe" INTEGER,
    "idRecipeImage" INTEGER,

    CONSTRAINT "Rejection_pkey" PRIMARY KEY ("idRejection")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "idUserNotification" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(0),

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("idUserNotification")
);

-- CreateIndex
CREATE INDEX "AnnouncementRead_idUser_idx" ON "AnnouncementRead"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "AnnouncementRead_idUser_idAnnouncement_key" ON "AnnouncementRead"("idUser", "idAnnouncement");

-- CreateIndex
CREATE INDEX "RecipeComment_idRecipe_idx" ON "RecipeComment"("idRecipe");

-- CreateIndex
CREATE INDEX "RecipeComment_idUser_idx" ON "RecipeComment"("idUser");

-- CreateIndex
CREATE INDEX "RecipeComment_isReported_idx" ON "RecipeComment"("isReported");

-- CreateIndex
CREATE INDEX "RecipeComment_isVisible_idx" ON "RecipeComment"("isVisible");

-- CreateIndex
CREATE INDEX "RecipeComment_idRecipe_isVisible_idx" ON "RecipeComment"("idRecipe", "isVisible");

-- CreateIndex
CREATE INDEX "RecipeCommentReport_idRecipeComment_idx" ON "RecipeCommentReport"("idRecipeComment");

-- CreateIndex
CREATE INDEX "RecipeCommentReport_idUser_idx" ON "RecipeCommentReport"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCommentReport_idRecipeComment_idUser_key" ON "RecipeCommentReport"("idRecipeComment", "idUser");

-- CreateIndex
CREATE INDEX "Rejection_idRecipe_idx" ON "Rejection"("idRecipe");

-- CreateIndex
CREATE INDEX "Rejection_idRecipeImage_idx" ON "Rejection"("idRecipeImage");

-- CreateIndex
CREATE INDEX "UserNotification_idUser_readAt_idx" ON "UserNotification"("idUser", "readAt");

-- CreateIndex
CREATE INDEX "UserNotification_createdAt_idx" ON "UserNotification"("createdAt");

-- CreateIndex
CREATE INDEX "Recipe_idUser_idx" ON "Recipe"("idUser");

-- CreateIndex
CREATE INDEX "Recipe_isApproved_idx" ON "Recipe"("isApproved");

-- CreateIndex
CREATE INDEX "Recipe_isBanned_idx" ON "Recipe"("isBanned");

-- CreateIndex
CREATE INDEX "Recipe_createdAt_idx" ON "Recipe"("createdAt");

-- CreateIndex
CREATE INDEX "Recipe_idUser_isApproved_idx" ON "Recipe"("idUser", "isApproved");

-- CreateIndex
CREATE INDEX "Recipe_idUser_isBanned_idx" ON "Recipe"("idUser", "isBanned");

-- CreateIndex
CREATE INDEX "Recipe_isApproved_isBanned_idx" ON "Recipe"("isApproved", "isBanned");

-- CreateIndex
CREATE INDEX "RecipeImage_idUser_isApproved_idx" ON "RecipeImage"("idUser", "isApproved");

-- CreateIndex
CREATE INDEX "RecipeImage_idUser_isBanned_idx" ON "RecipeImage"("idUser", "isBanned");

-- AddForeignKey
ALTER TABLE "AdminLog" ADD CONSTRAINT "AdminLog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementRead" ADD CONSTRAINT "AnnouncementRead_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementRead" ADD CONSTRAINT "AnnouncementRead_idAnnouncement_fkey" FOREIGN KEY ("idAnnouncement") REFERENCES "Announcement"("idAnnouncement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_idBanReason_fkey" FOREIGN KEY ("idBanReason") REFERENCES "BanReason"("idBanReason") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD CONSTRAINT "RecipeComment_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD CONSTRAINT "RecipeComment_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCommentReport" ADD CONSTRAINT "RecipeCommentReport_idRecipeComment_fkey" FOREIGN KEY ("idRecipeComment") REFERENCES "RecipeComment"("idRecipeComment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCommentReport" ADD CONSTRAINT "RecipeCommentReport_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_idBanReason_fkey" FOREIGN KEY ("idBanReason") REFERENCES "BanReason"("idBanReason") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejection" ADD CONSTRAINT "Rejection_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejection" ADD CONSTRAINT "Rejection_idRecipeImage_fkey" FOREIGN KEY ("idRecipeImage") REFERENCES "RecipeImage"("idRecipeImage") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
