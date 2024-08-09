import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const updatedStatus = await prisma.status.update({
            where: { id: body.id },
            data: {
                name: body.name,
            },
        });

        return { success: true, data: updatedStatus, message: 'Статус успешно обновлен' };
    } catch (error) {
        return { success: false, message: 'Ошибка при обновлении статуса' };
    }
});
