"use server";

import { Session } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function createSession(data: Omit<Session, "id">) {
    return await prisma.session.create({
        data,
    });
}

export async function getSession(id: string) {
    return await prisma.session.findUnique({
        where: { id },
    });
}

export async function deleteSession(id: string) {
    await prisma.session.delete({
        where: { id },
    });
}

export async function checkExpiredSessions() {
    try {
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                expireDate: {
                    lt: new Date(),
                },
            },
        });
        if (deletedSessions.count > 0) {
            console.log("Deleted ", deletedSessions.count, "items");
        }
    } catch (error) {
        console.log(
            "An error ocurred while deleting expired sessions: ",
            error,
        );
    }
}
