import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as db from "@/actions/db";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/user";
import { domain } from "@/config";

export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    if (access_token && account_id) {

        const { session_id } = await createSession(access_token);

        if (session_id) {
    
            const data = {
                accessToken: access_token,
                accountId: String(account_id),
                sessionId: session_id,
            };
    
            /* Save session to DB */
            const newSession = await db.createSession(data);
    
            console.log("New Session: ", newSession);
    
            const cookieStore = await cookies();
    
            cookieStore.set({
                name: "accountId",
                value: String(account_id),
                secure: true,
                sameSite: 'lax',
                domain: domain(),
                expires: new Date(Date.now() + 3600000),
    
            });
    
            cookieStore.set({
                name: "accessToken",
                value: access_token,
                secure: true,
                sameSite: 'lax',
                domain: domain(),
                expires: new Date(Date.now() + 3600000),
            });
    
            cookieStore.set({
                name: "sessionId",
                value: session_id,
                secure: true,
                sameSite: 'lax',
                domain: domain(),
                expires: new Date(Date.now() + 3600000),
            });
    
            cookieStore.delete('token');
        }
    }

    const url = request.nextUrl;

    const redirectURL = `${url.origin}/${locale}/user/profile`;

    return NextResponse.redirect(redirectURL);
}