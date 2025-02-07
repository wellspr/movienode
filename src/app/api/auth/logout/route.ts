import { getAuthenticationDetails } from "@/actions/user";
import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import * as db from "@/db";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const logoutURL = "https://api.themoviedb.org/3/authentication/session";

    const session = await getAuthenticationDetails();

    if (session) {

        const { sessionId } = session;

        await fetch(logoutURL, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
            body: JSON.stringify({ 'session_id': sessionId }),
        });

        const currentSession = await db.prisma.session.findFirst({
            where: {
                sessionId, 
            }
        });
    
        if (currentSession) {
            await db.prisma.session.delete({
                where: {
                    id: currentSession.id
                }
            });
        }

        await db.prisma.$disconnect();

        const cookieStore = await cookies();

        cookieStore.delete('accessToken');
        cookieStore.delete('sessionId');
        cookieStore.delete('accountId');
        
        const url = request.nextUrl;
    
        const redirectURL = `${url.origin}/${locale}/user/profile`;
    
        return NextResponse.redirect(redirectURL);
    }
}