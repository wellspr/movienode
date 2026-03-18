import { NextResponse } from "next/server";
import { checkExpiredSessions } from "@/actions/db";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        await checkExpiredSessions();
        return NextResponse.json({
            success: true,
            message: "Sessions cleaned up",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error cleaning up sessions" },
            { status: 500 },
        );
    }
}
