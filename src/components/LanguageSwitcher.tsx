import { flags, locales, regions } from "@/i18n/config";
import { useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export const LanguageSwitcher = () => {

    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const locale = params.locale as Locale;


    const changeLocale = useCallback((locale: Locale) => {

        let currentPathname = "";

        if (pathname.startsWith("/en-US")) {
            currentPathname = pathname.split("/en-US")[1] || "/";
        }

        if (pathname.startsWith("/pt-BR")) {
            currentPathname = pathname.split("/pt-BR")[1] || "/";
        }

        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        router.replace({ pathname: currentPathname, params }, { locale });
    }, [params, pathname, router]);

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
                                />
                            </div>
                        </button>
                    );
                })
            }
        </div>
    );
};