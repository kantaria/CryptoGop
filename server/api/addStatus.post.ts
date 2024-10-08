import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const newStatus = await prisma.status.create({
        data: {
            name: body.name,
        },
    });

    return newStatus;
});
