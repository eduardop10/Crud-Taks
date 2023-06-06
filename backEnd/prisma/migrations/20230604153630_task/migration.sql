/*
  Warnings:

  - You are about to drop the `movie_rent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "movie_rent" DROP CONSTRAINT "movie_rent_movieId_fkey";

-- DropForeignKey
ALTER TABLE "movie_rent" DROP CONSTRAINT "movie_rent_userId_fkey";

-- DropTable
DROP TABLE "movie_rent";

-- DropTable
DROP TABLE "movies";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "priority" "Priority" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
