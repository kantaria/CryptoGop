import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const newCryptoData = await prisma.cryptoData.create({
            data: {
                rate: parseFloat(body.rate),
                executed: body.executed ? parseFloat(body.executed) : null,
                low: parseFloat(body.low),
                high: parseFloat(body.high),
                coinId: body.coinId,  // ID монеты
                statusId: body.statusId,  // ID статуса
                purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
                saleDate: body.saleDate ? new Date(body.saleDate) : null,
                orderDate: body.orderDate ? new Date(body.orderDate) : null,
            },
        });

        return {
            success: true,
            data: newCryptoData,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Ошибка при добавлении данных.',
            error: error.message,
        };
    }
});
