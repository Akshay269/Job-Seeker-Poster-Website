/*
  Warnings:

  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - Made the column `location` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "type",
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "salaryRange" TEXT,
ADD COLUMN     "skills" TEXT,
ADD COLUMN     "workType" TEXT,
ALTER COLUMN "location" SET NOT NULL;
