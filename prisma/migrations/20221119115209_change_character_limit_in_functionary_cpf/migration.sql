/*
  Warnings:

  - The primary key for the `functionary` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `functionary` DROP PRIMARY KEY,
    MODIFY `cpf` VARCHAR(15) NOT NULL,
    ADD PRIMARY KEY (`cpf`);
