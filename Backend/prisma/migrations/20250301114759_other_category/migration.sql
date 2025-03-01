/*
  Warnings:

  - The values [ACCEPTED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'OTHER';

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('REPORTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');
ALTER TABLE "problems" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "problems" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "problems" ALTER COLUMN "status" SET DEFAULT 'REPORTED';
COMMIT;
