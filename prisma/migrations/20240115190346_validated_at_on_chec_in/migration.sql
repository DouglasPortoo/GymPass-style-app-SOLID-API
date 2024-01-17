/*
  Warnings:

  - You are about to drop the column `valideted_at` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "valideted_at",
ADD COLUMN     "validated_at" TIMESTAMP(3);
