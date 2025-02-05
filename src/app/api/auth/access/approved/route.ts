import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as db from "@/actions/db";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/user";

export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    const { session_id } = await createSession(access_token);

    const data = {
        accessToken: access_token,
        accountId: String(account_id),
        sessionId: session_id,
    };

    /* Save session to DB */
    db.createSession(data);
    
    const cookieStore = await cookies();
    
    cookieStore.set({
        name: "accountId",
        value: String(account_id),
        secure: true,
        sameSite: true,
    });

    cookieStore.delete('token');
    
    const url = request.nextUrl;

    const redirectURL = `${url.origin}/${locale}/user/profile`;

    return NextResponse.redirect(redirectURL);
}