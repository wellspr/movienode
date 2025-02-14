import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { createAccessToken } from "@/actions/auth";
import { createSession } from "@/actions/session";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {

    const locale = await getLocale();

    const { access_token, account_id } = await createAccessToken();

    await createSession({ accessToken: access_token, accountId: account_id, userAgent: userAgent(request) });

    const cookieStore = await cookies();
    const returningPath = cookieStore.get('returningPath')?.value; /* this starts with a slash */
    cookieStore.delete('returningPath');

    const url = request.nextUrl;

    const redirectURL = url.origin + "/" + locale + returningPath; /* obs.: returningPath has a starting slash */

    const response = NextResponse.redirect(redirectURL);

    return response;
}