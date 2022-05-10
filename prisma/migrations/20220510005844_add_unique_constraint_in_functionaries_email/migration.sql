/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `functionary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `functionary_email_key` ON `functionary`(`email`);
