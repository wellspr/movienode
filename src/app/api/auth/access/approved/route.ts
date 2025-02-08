import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/user";
import { setSessionCookie } from "@/actions/cookies";

export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    if (access_token && account_id) {
        const session = await createSession(access_token, account_id);

        if (session) {
            const sessionCookie = { id: session.id };
            await setSessionCookie(sessionCookie);
        }
    }

    const url = request.nextUrl;

    const redirectURL = `${url.origin}/${locale}`;

    const response = NextResponse.redirect(redirectURL);

    return response;
}