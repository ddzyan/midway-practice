-- CreateTable
CREATE TABLE `classroom` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `grade` TINYINT UNSIGNED NOT NULL,
    `prom` TINYINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(20) NOT NULL,
    `lastName` VARCHAR(20) NOT NULL,
    `number` VARCHAR(32) NOT NULL,
    `classroomId` INTEGER UNSIGNED NOT NULL,

    INDEX `idx_number`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parent_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `tel` VARCHAR(20) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `idx_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_id_fkey` FOREIGN KEY (`id`) REFERENCES `parent_info`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_classroomId_fkey` FOREIGN KEY (`classroomId`) REFERENCES `classroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
