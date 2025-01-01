"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n/types";
import { createContext, useCallback, useContext } from "react";

type LocaleContextType = {
    changeLocale: (locale: Locale) => void
}

const defaultValue: LocaleContextType = {
    changeLocale: () => { },
};

const Context = createContext<LocaleContextType>(defaultValue);

export const LocaleContext = ({ children }: { children: React.ReactNode }) => {

    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const changeLocale = useCallback((locale: Locale) => {
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        router.replace({ pathname, params }, { locale });
    }, [params, pathname, router]);

    const value: LocaleContextType = {
        changeLocale,
    };

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
};

export const useLocaleContext = () => useContext(Context);