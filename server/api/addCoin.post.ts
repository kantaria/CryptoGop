import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const newCoin = await prisma.coin.create({
        data: {
            name: body.name,
        },
    });

    return newCoin;
});
