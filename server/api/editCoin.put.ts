import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const updatedCoin = await prisma.coin.update({
            where: { id: body.id },
            data: {
                name: body.name,
            },
        });

        return { success: true, data: updatedCoin, message: 'Монета успешно обновлена' };
    } catch (error) {
        return { success: false, message: 'Ошибка при обновлении монеты' };
    }
});
