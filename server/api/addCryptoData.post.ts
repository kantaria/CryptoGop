import { PrismaClient } from '@prisma/client';
import { H3Event } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    try {
        // Преобразование строки с запятой в число с точкой
        const rate = typeof body.rate === 'string' ? parseFloat(body.rate.replace(',', '.')) : body.rate;
        const commission = rate * 0.001; // 0,1% от rate

        const newCryptoData = await prisma.cryptoData.create({
            data: {
                rate: rate,
                executed: body.executed ? parseFloat(body.executed.toString().replace(',', '.')) : null,
                low: typeof body.low === 'string' ? parseFloat(body.low.replace(',', '.')) : body.low,
                high: typeof body.high === 'string' ? parseFloat(body.high.replace(',', '.')) : body.high,
                commission: commission,
                active: body.active || 0,
                purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
                saleDate: body.saleDate ? new Date(body.saleDate) : null,
                orderDate: body.orderDate ? new Date(body.orderDate) : null,
                coin: {
                    connect: { id: body.coinId }
                },
                status: {
                    connect: { id: body.statusId }
                }
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
