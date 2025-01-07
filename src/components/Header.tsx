"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderNav } from "./HeaderNav";
import { IconSearch } from "@tabler/icons-react";


export const Header = () => {
    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <header className="header">

            <div className="header__top">
                <Link className="header__link" href={"/"} locale={locale}>
                    <h1 className="header__link__text app-title">Movieflix</h1>
                </Link>

                <Link className="button-search" href={"/search"} locale={locale}>
                    <IconSearch />        
                </Link>

                <LanguageSwitcher />
            </div>
            
            <HeaderNav />
        </header>
    );
}