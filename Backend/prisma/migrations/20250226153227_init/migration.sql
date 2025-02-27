/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REPORTED', 'IN_PROGRESS', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('INSFRASTURCTURE', 'ENVIROUNMENT', 'COMMUNITY_SERVICES');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "houseLocation" TEXT,
ADD COLUMN     "isGoverment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "problems" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "clustorId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'REPORTED',
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "rating" SMALLINT DEFAULT 0,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" SERIAL NOT NULL,
    "totalProblems" INTEGER NOT NULL DEFAULT 0,
    "solvedProblems" INTEGER NOT NULL DEFAULT 0,
    "inProgress" INTEGER NOT NULL DEFAULT 0,
    "rejected" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
