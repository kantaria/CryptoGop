import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const status = await prisma.status.findMany();
    return status;
});
