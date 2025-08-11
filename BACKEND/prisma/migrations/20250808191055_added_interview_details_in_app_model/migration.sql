-- AlterTable
ALTER TABLE "public"."Application" ADD COLUMN     "interviewDate" TIMESTAMP(3),
ADD COLUMN     "interviewTime" TEXT,
ADD COLUMN     "meetingLink" TEXT;
