-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "coachName" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "firstTime" BOOLEAN NOT NULL,
    "workoutRating" INTEGER NOT NULL,
    "cleanlinessRating" INTEGER NOT NULL,
    "recommendationRating" INTEGER NOT NULL,
    "returnRating" INTEGER NOT NULL,
    "coachRating" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Feedback_location_idx" ON "Feedback"("location");
