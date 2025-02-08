import { Session, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const createSession = async (data: Omit<Session, "id">) => {
    const session = await prisma.session.create({
        data
    });

    await prisma.$disconnect();

    return session;
};

export const getSession = async (id: string) => {
    const session = await prisma.session.findFirst({
        where: { id }
    });

    await prisma.$disconnect();

    return session;
};

export const deleteSession = async (id: string) => {
    await prisma.session.delete({
        where: { id }
    });

    await prisma.$disconnect();
};