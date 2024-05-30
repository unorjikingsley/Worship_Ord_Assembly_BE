-- CreateTable
CREATE TABLE "FirstTimer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_Number" BIGINT NOT NULL,
    "inviter" TEXT,
    "location" TEXT,
    "prayerRequest" TEXT,

    CONSTRAINT "FirstTimer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerForm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_Number" BIGINT NOT NULL,
    "prayerRequest" TEXT NOT NULL,

    CONSTRAINT "PrayerForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonyForm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT NOT NULL,
    "avatarPublicId" TEXT NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_Number" BIGINT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Give a title to this testimony',
    "testimony" TEXT NOT NULL,
    "accept" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TestimonyForm_pkey" PRIMARY KEY ("id")
);
