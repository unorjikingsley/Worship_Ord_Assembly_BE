-- CreateEnum
CREATE TYPE "CommunityStatus" AS ENUM ('MarriageCounsellingWorkshop', 'YouthProgramsAndCommunities', 'KidsProgram', 'MenMinistry', 'YouthLeader', 'TrybeTeam');

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "Topic" TEXT NOT NULL,
    "sub_Topic" TEXT NOT NULL,
    "minister" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WOA_Community" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "full_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_Number" TEXT,
    "community" "CommunityStatus" NOT NULL DEFAULT 'KidsProgram',
    "reasons" TEXT,

    CONSTRAINT "WOA_Community_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WOA_Community_email_key" ON "WOA_Community"("email");
