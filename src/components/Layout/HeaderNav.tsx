"use client";

import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieCategoryType, TVSeriesCategoryType } from "@/types";
import { useTranslations } from "next-intl";
import { useParams, useSelectedLayoutSegments } from "next/navigation";

export const MoviesNav = () => {

    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav.movies");

    const segment = useSelectedLayoutSegments();

    return (
        <nav className="nav">
            {
                navLinks.movies.map(link => {
                    return (
                        <Link className={segment[2] === link.translation ? "link--active" : "link"}
                            key={link.id} locale={locale} href={link.url}>
                            {t(link.translation as MovieCategoryType)}
                        </Link>
                    );
                })
            }
        </nav>
    );
};

export const TVNav = () => {

    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav.tv");

    const segment = useSelectedLayoutSegments();

    return (
        <nav className="nav">
            {
                navLinks.tv.map(link => {
                    return (
                        <Link className={segment[2] === link.translation ? "link--active" : "link"}
                            key={link.id} locale={locale} href={link.url}>
                            {t(link.translation as TVSeriesCategoryType)}
                        </Link>
                    );
                })
            }
        </nav>
    );
};

export const MainNav = () => {
    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav.main");

    const segment = useSelectedLayoutSegments();

    return (
        <nav className="nav main-nav">
            {
                navLinks.main.map(link => {
                    return (
                        <Link className={segment[0] === link.translation && segment.length === 1 ? "link--active" : "link"}
                            key={link.id} locale={locale} href={link.url}>
                            {t(link.translation as "movies" | "tv")}
                        </Link>
                    );
                })
            }
        </nav>
    );
}