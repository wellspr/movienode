import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/session";


export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    await createSession({accessToken: access_token, accountId: account_id, userAgent: userAgent(request)});

    const url = request.nextUrl;

    const redirectURL = `${url.origin}/${locale}`;

    const response = NextResponse.redirect(redirectURL);

    return response;
}