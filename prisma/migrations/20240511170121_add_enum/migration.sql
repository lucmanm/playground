-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'EDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
