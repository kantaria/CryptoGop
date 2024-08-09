import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event);

    // Попробуем удалить связанную запись, если она существует
    try {
        await prisma.status.delete({
            where: { id },
        });

        return { success: true, message: 'Статус успешно удалена' };
    } catch (error) {
        return { success: false, message: 'Невозможно удалить статус, так как существуют связанные записи' };
    }
});
