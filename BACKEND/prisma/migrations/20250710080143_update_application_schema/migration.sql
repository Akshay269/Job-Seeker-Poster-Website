/*
  Warnings:

  - You are about to drop the column `email` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `lastCompany` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Application` table. All the data in the column will be lost.
  - Added the required column `contactInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educations` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experiences` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "email",
DROP COLUMN "experience",
DROP COLUMN "fullName",
DROP COLUMN "lastCompany",
DROP COLUMN "phone",
ADD COLUMN     "certifications" JSONB,
ADD COLUMN     "contactInfo" JSONB NOT NULL,
ADD COLUMN     "educations" JSONB NOT NULL,
ADD COLUMN     "experiences" JSONB NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "otherFiles" JSONB,
ADD COLUMN     "personalInfo" JSONB NOT NULL,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "skills" JSONB NOT NULL;
