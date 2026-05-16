-- CreateTable
CREATE TABLE `Prospect` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `source` VARCHAR(191) NOT NULL DEFAULT 'Direct',
    `stage` VARCHAR(191) NOT NULL DEFAULT 'Cold',
    `lastContactDate` DATETIME(3) NULL,
    `nextFollowUpDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Prospect_stage_createdAt_idx`(`stage`, `createdAt`),
    INDEX `Prospect_nextFollowUpDate_idx`(`nextFollowUpDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProspectNote` (
    `id` VARCHAR(191) NOT NULL,
    `prospectId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProspectNote_prospectId_createdAt_idx`(`prospectId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OnboardingChecklist` (
    `id` VARCHAR(191) NOT NULL,
    `prospectId` VARCHAR(191) NOT NULL,
    `stepNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `assignee` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'todo',
    `dueDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `OnboardingChecklist_prospectId_status_idx`(`prospectId`, `status`),
    UNIQUE INDEX `OnboardingChecklist_prospectId_stepNumber_key`(`prospectId`, `stepNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProspectNote` ADD CONSTRAINT `ProspectNote_prospectId_fkey` FOREIGN KEY (`prospectId`) REFERENCES `Prospect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OnboardingChecklist` ADD CONSTRAINT `OnboardingChecklist_prospectId_fkey` FOREIGN KEY (`prospectId`) REFERENCES `Prospect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
