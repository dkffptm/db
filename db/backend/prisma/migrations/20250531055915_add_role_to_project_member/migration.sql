-- DropForeignKey
ALTER TABLE `projectmember` DROP FOREIGN KEY `ProjectMember_projectId_fkey`;

-- DropIndex
DROP INDEX `ProjectMember_projectId_userId_key` ON `projectmember`;

-- AlterTable
ALTER TABLE `projectmember` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
