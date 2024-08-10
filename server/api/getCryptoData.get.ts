import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const cryptoData = await prisma.cryptoData.findMany({
        include: {
            coin: true, // Включаем связанную таблицу монет
            Status: true // Включаем связанную таблицу статусов
        }
    });
    return cryptoData;
});
