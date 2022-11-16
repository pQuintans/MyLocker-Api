/*
  Warnings:

  - You are about to drop the column `FK_apm_id` on the `student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `FKApmIdStudent` ON `student`;

-- DropIndex
DROP INDEX `student_FK_apm_id_key` ON `student`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `FK_apm_id`;
