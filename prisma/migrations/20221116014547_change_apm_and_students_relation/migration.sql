-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `FKApmIdStudent`;

-- AlterTable
ALTER TABLE `apm` ADD COLUMN `studentRa` VARCHAR(12) NULL;

-- AddForeignKey
ALTER TABLE `apm` ADD CONSTRAINT `FKStudentRaApm` FOREIGN KEY (`studentRa`) REFERENCES `student`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;
