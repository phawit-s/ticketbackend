-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "refreshToken" TEXT;
