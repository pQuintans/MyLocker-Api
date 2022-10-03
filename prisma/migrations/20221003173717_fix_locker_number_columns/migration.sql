/*
  Warnings:

  - A unique constraint covering the columns `[locker_number]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `student_locker_number_key` ON `student`(`locker_number`);
