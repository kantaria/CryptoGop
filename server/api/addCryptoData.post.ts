import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const newCryptoData = await prisma.cryptoData.create({
            data: {
                rate: body.rate,
                executed: body.executed,
                low: body.low,
                high: body.high,
                comByCoin: body.comByCoin,
                comSellUSDT: body.comSellUSDT,
                active: body.active || 0, // Если active не передан, устанавливаем 0
                purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
                saleDate: body.saleDate ? new Date(body.saleDate) : null,
                orderDate: body.orderDate ? new Date(body.orderDate) : null,
                coinId: body.coinId,
                statusId: body.statusId,
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
