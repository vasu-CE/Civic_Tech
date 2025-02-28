/*
  Warnings:

  - The values [INSFRASTURCTURE] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `votes` on the `problems` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('INFRASTURCTURE', 'ENVIROUNMENT', 'COMMUNITY_SERVICES');
ALTER TABLE "problems" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "votes";

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_problemId_key" ON "Vote"("userId", "problemId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
