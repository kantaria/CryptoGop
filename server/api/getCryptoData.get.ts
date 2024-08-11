import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const cryptoData = await prisma.cryptoData.findMany({
        include: {
            coin: true, // Включаем связанную таблицу монет
            status: true // Используем правильное имя поля
        }
    });
    return cryptoData;
});
