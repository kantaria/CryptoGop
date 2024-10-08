import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const coins = await prisma.coin.findMany();
    return coins;
});
