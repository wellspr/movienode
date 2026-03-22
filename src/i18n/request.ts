import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale } from "./types";

const messageImports = {
    "en-US": () => import("@/messages/en-US.json"),
    "pt-BR": () => import("@/messages/pt-BR.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = (await requestLocale) as Locale;

    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale as Locale;
    }

    const importFunc = messageImports[locale as keyof typeof messageImports];

    const messages = (await importFunc()).default;

    return {
        locale,
        messages,
    };
});
