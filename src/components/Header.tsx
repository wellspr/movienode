"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderNav } from "./HeaderNav";


export const Header = () => {
    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <header className="header">

            <div className="header__top">
                <Link className="header__link" href={"/"} locale={locale}>
                    <h1 className="header__link__text app-title">Movieflix</h1>
                </Link>

                <LanguageSwitcher />
            </div>
            
            <HeaderNav />
        </header>
    );
}