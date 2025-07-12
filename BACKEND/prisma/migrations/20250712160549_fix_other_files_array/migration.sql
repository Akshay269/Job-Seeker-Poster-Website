/*
  Warnings:

  - The `otherFiles` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "otherFiles",
ADD COLUMN     "otherFiles" TEXT[] DEFAULT ARRAY[]::TEXT[];
