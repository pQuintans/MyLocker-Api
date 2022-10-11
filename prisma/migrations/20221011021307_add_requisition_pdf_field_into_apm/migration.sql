/*
  Warnings:

  - Added the required column `requisitionPDF` to the `apm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apm` ADD COLUMN `requisitionPDF` VARCHAR(191) NOT NULL;
