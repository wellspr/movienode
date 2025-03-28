import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    matcher: ['/', '/en-US/', '/pt-BR/', '/(en-US|pt-BR)/:path*']
};