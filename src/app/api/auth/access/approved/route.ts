import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/user";

export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    if (access_token && account_id) {
        const session = await createSession(access_token, account_id);

        if (session?.success) {   
            const cookieStore = await cookies();    
            cookieStore.set("accountId", account_id);
            cookieStore.set("accessToken", access_token);
            cookieStore.delete('token');
        }
    }

    const url = request.nextUrl;

    const redirectURL = `${url.origin}/${locale}`;

    const response = NextResponse.redirect(redirectURL);

    return response;
}