/*
  Warnings:

  - You are about to drop the column `FK_student_ra` on the `apm` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[FK_apm_id]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `apm` DROP FOREIGN KEY `FKStudentRaApm`;

-- AlterTable
ALTER TABLE `apm` DROP COLUMN `FK_student_ra`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `FK_apm_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `student_FK_apm_id_key` ON `student`(`FK_apm_id`);

-- CreateIndex
CREATE INDEX `FKApmIdStudent` ON `student`(`FK_apm_id`);

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `FKApmIdStudent` FOREIGN KEY (`FK_apm_id`) REFERENCES `apm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
