-- CreateTable
CREATE TABLE "ContactUsModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_Number" TEXT,
    "descriptions" TEXT,

    CONSTRAINT "ContactUsModel_pkey" PRIMARY KEY ("id")
);
