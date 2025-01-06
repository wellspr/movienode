"use client";

import { useRouter, usePathname } from "@/i18n/routing";
//import { useParams } from "next/navigation";
import { Locale } from "@/i18n/types";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext } from "react";

type LocaleContextType = {
    changeLocale: (locale: Locale) => void
}

const defaultValue: LocaleContextType = {
    changeLocale: () => { },
};

const Context = createContext<LocaleContextType>(defaultValue);

export const LocaleContext = ({ children }: { children: React.ReactNode }) => {

    //const params = useParams();
    const pathname = usePathname();
    const query = useSearchParams();
    const router = useRouter();

    
    const changeLocale = useCallback((locale: Locale) => {
        console.log("Pathname: ", pathname, "Query: ", query.get('page'));

        router.replace(pathname, { locale });
    }, [pathname, router, query]);

    const value: LocaleContextType = {
        changeLocale,
    };

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
};

export const useLocaleContext = () => useContext(Context);