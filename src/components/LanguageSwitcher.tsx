import { flags, locales, regions } from "@/i18n/config";
import { usePathname } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const LanguageSwitcher = () => {

    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const locale = params.locale as Locale;

    const changeLocale = useCallback((locale: Locale) => {

        const query: { [key: string]: string } = {};

        searchParams.forEach((value, key) => {
            query[key] = value;
        });

        const urlSearchParams = new URLSearchParams(query);

        const url = new URL(`/${locale}${pathname}`, window.location.origin);

        urlSearchParams.forEach((value, key) => {
            url.searchParams.set(key, value);
        });

        window.history.replaceState(null, "", url.href);
        window.location.reload();

    }, [pathname, searchParams]);

    return (
        <div className="language-switcher">
            {
                locales.map((l) => {
                    return (
                        <button
                            key={l}
                            disabled={locale === l}
                            className="icon language-switcher__button"
                            onClick={() => {
                                changeLocale(l);
                            }}>
                            <div className="language-switcher__button__image">
                                <Image
                                    src={`/assets/icons/flags/${flags[l]}`}
                                    alt={regions[l]}
                                    fill
                                    draggable={false}
                                />
                            </div>
                        </button>
                    );
                })
            }
        </div>
    );
};