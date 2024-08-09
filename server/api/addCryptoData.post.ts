import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const newCryptoData = await prisma.cryptoData.create({
        data: {
            rate: body.rate,
            executed: body.executed,
            low: body.low,
            high: body.high,
            comByCoin: body.comByCoin,
            comSellUSDT: body.comSellUSDT,
            active: body.active,
            status: body.status,
            purchaseDate: new Date(body.purchaseDate),
            saleDate: body.saleDate ? new Date(body.saleDate) : null,
            orderDate: new Date(body.orderDate),
            coinId: body.coinId,  // Используем ID существующей монеты
        },
    });

    return newCryptoData;
});
