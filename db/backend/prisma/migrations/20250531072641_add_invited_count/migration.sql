/*
  Warnings:

  - A unique constraint covering the columns `[projectId,userId]` on the table `ProjectMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `invitedCount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `ProjectMember_projectId_userId_key` ON `ProjectMember`(`projectId`, `userId`);
