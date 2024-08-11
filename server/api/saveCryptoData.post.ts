import { PrismaClient } from '@prisma/client';
import { H3Event } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    const cryptoData = await prisma.cryptoData.create({
        data: {
            rate: body.rate,
            executed: body.executed,
            low: body.low,
            high: body.high,
            commission: body.commission,
            active: body.active,
            coin: body.coin,
            status: body.status,
            purchaseDate: new Date(body.purchaseDate),
            saleDate: new Date(body.saleDate),
            orderDate: new Date(body.orderDate),
        },
    });

    return {
        success: true,
        data: cryptoData,
    };
});
