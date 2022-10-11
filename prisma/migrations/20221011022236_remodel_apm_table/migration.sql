/*
  Warnings:

  - You are about to drop the column `isPaid` on the `apm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apm` DROP COLUMN `isPaid`,
    MODIFY `FK_functionary_cpf` VARCHAR(12) NULL;
