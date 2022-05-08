-- CreateTable
CREATE TABLE `apm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_paid` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `FK_student_ra` VARCHAR(12) NOT NULL,
    `FK_functionary_cpf` VARCHAR(12) NOT NULL,

    INDEX `FKStudentRaApm`(`FK_student_ra`),
    INDEX `FKFunctionaryCpfApm`(`FK_functionary_cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `functionary` (
    `cpf` VARCHAR(10) NOT NULL,
    `first_name` VARCHAR(20) NOT NULL,
    `last_name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `profile_picture_url` VARCHAR(191) NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locker` (
    `number` INTEGER NOT NULL,
    `isRented` TINYINT NOT NULL,
    `rentedAt` DATETIME(3) NOT NULL,
    `FK_section_id` INTEGER NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,

    INDEX `FKSectionIdLocker`(`FK_section_id`),
    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(10) NOT NULL,
    `left_room` VARCHAR(20) NOT NULL,
    `right_room` VARCHAR(20) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `ra` VARCHAR(12) NOT NULL,
    `first_name` VARCHAR(20) NOT NULL,
    `last_name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NULL,
    `code` VARCHAR(6) NULL,
    `locker_number` INTEGER NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `profile_picture_url` VARCHAR(255) NULL,

    INDEX `FKLockerNumberStudent`(`locker_number`),
    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `apm` ADD CONSTRAINT `FKFunctionaryCpfApm` FOREIGN KEY (`FK_functionary_cpf`) REFERENCES `functionary`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apm` ADD CONSTRAINT `FKStudentRaApm` FOREIGN KEY (`FK_student_ra`) REFERENCES `student`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locker` ADD CONSTRAINT `FKSectionIdLocker` FOREIGN KEY (`FK_section_id`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `FKLockerNumberStudent` FOREIGN KEY (`locker_number`) REFERENCES `locker`(`number`) ON DELETE CASCADE ON UPDATE CASCADE;
