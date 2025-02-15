"use client";

import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

export const MenuComponent = () => {
    const navigate = useRouter();
    const params = useParams();
    const locale = params.locale as Locale;
    const t = useTranslations("HeaderNav.main");

    return (
        <div className="app-menu">
            <div className="app-menu__button-close"
                onClick={() => {
                    navigate.back();
                }}>
                <IconX />
            </div>

            <nav className="app-menu__nav">
                {
                    navLinks.main.map(link => {
                        const className = "link";
                        return (
                            <div key={link.id}>
                                <Link className={className} locale={locale} href={link.url}>
                                    {t(link.translation as "movies" | "tv")}
                                </Link>
                            </div>
                        );
                    })
                }
            </nav>
        </div>
    );
}