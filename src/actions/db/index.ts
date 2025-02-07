import { Session, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const createSession = async (data: Omit<Session, "id">) => {
    const session = await prisma.session.create({
        data
    });

    await prisma.$disconnect();

    return session;
};

export const getSession = async (accountId: string, accessToken: string) => {
    const session = await prisma.session.findFirst({
        where: {
            accountId,
            accessToken
        }
    });

    await prisma.$disconnect();

    return session;
};

export const deleteSession = async (sessionId: string, accessToken: string) => {
    const currentSession = await prisma.session.findFirst({
        where: {
            sessionId,
            accessToken
        }
    });

    if (currentSession) {
        await prisma.session.delete({
            where: {
                id: currentSession.id
            }
        });
    }

    await prisma.$disconnect();
};