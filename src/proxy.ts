import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ["/", "/en-US/", "/pt-BR/", "/(en-US|pt-BR)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
