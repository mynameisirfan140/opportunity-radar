import { PrismaClient } from '@prisma/client';

// Initialize Prisma client (singleton)
export const prisma = new PrismaClient();