import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event);

    // Попробуем удалить связанную запись, если она существует
    try {
        await prisma.coin.delete({
            where: { id },
        });

        return { success: true, message: 'Монета успешно удалена' };
    } catch (error) {
        return { success: false, message: 'Невозможно удалить монету, так как существуют связанные записи' };
    }
});
