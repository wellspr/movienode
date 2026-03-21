import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const BANNED_AGENTS = [
    "bot",
    "spider",
    "crawl",
    "scraper", // Genéricos
    "python",
    "curl",
    "postman",
    "http-client", // Ferramentas de script
    "headless",
    "selenium",
    "puppeteer", // Navegadores automáticos
    "ahrefs",
    "semrush",
    "dotbot",
    "rogerbot", // Bots de SEO agressivos
];

export default function proxy(request: NextRequest) {
    const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

    // 1. Verificação de Bot
    const isBot = BANNED_AGENTS.some((agent) => userAgent.includes(agent));

    if (isBot) {
        console.log(`[Security] Bloqueado acesso de bot: ${userAgent}`);
        // Retorna 403 Forbidden para economizar recursos
        return new NextResponse("Access Denied", { status: 403 });
    }
    return intlMiddleware(request);
}

export const config = {
    //matcher: ["/", "/en-US/", "/pt-BR/", "/(en-US|pt-BR)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
    matcher: [
        "/", 
        "/(en-US|pt-BR)/:path*", 
        "/((?!_next|_vercel|api|.*\\..*).*)"
    ],
};
