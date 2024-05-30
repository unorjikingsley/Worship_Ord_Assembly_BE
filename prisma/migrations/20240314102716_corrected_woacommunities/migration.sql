/*
  Warnings:

  - You are about to drop the column `community` on the `WOA_Community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WOA_Community" DROP COLUMN "community",
ADD COLUMN     "communities" "CommunityStatus" NOT NULL DEFAULT 'KidsProgram';
