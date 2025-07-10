-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'REJECTED', 'HIRED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING_REVIEW';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'ACTIVE';
