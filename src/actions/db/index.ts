"use server";

import { Session, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createSession(data: Omit<Session, "id">) {
    const session = await prisma.session.create({
        data
    });

    await prisma.$disconnect();

    return session;
}

export async function getSession(id: string) {
    const session = await prisma.session.findFirst({
        where: { id }
    });

    await prisma.$disconnect();

    return session;
}

export async function deleteSession(id: string) {
    await prisma.session.delete({
        where: { id }
    });

    await prisma.$disconnect();
}

export async function checkExpiredSessions() {
    const sessions = await prisma.session.findMany();

    if (sessions.length === 0) {
        return null
    };

    const expiredSessions = sessions
        .filter(session => {
            const expireDate = session.expireDate.getTime();
            const now = Date.now();
            return expireDate < now;
        })
        .map(session => session.id);


    if (expiredSessions.length > 0) {
        console.log('deleting expired items: ', expiredSessions);

        try {
            const response = await prisma.session.deleteMany({
                where: {
                    id: {
                        in: expiredSessions
                    }
                }
            });

            console.log("Deleted ", response.count, "items");
        } catch (err) {
            console.log(err);
        }
    }
}