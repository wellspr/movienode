import { prisma } from "@/db";
import { Session } from "@prisma/client";


export const createSession = async (data: Omit<Session, "id">) => {
    const session = await prisma.session.create({
        data
    });

    await prisma.$disconnect();

    return session;
};