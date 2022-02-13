/*
  Warnings:

  - Made the column `url` on table `CoffeeShopPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "url" SET NOT NULL;
