/*
  Warnings:

  - You are about to drop the column `description` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "description";
