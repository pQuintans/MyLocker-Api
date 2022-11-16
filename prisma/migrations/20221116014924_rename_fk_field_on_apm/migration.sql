/*
  Warnings:

  - You are about to drop the column `studentRa` on the `apm` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `apm` DROP FOREIGN KEY `FKStudentRaApm`;

-- AlterTable
ALTER TABLE `apm` DROP COLUMN `studentRa`,
    ADD COLUMN `FK_student_ra` VARCHAR(12) NULL;

-- AddForeignKey
ALTER TABLE `apm` ADD CONSTRAINT `FKStudentRaApm` FOREIGN KEY (`FK_student_ra`) REFERENCES `student`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;
