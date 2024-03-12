-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "phone_Number" BIGINT,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_email_key" ON "Community"("email");
