"use client";

import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieCategoryType, TVSeriesCategoryType } from "@/types";
import { useTranslations } from "next-intl";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { RefObject } from "react";

export const MoviesNav = () => {

    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav.movies");

    const segment = useSelectedLayoutSegments();

    return (
        <nav className="nav media-menu">
            {
                navLinks.movies.map(link => {
                    const className = segment[0] === 'movies' && segment[2] === link.translation ? "link--active" : "link"
                    return (
                        <Link className={className} key={link.id} locale={locale} href={link.url}>
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
        <nav className="nav media-menu">
            {
                navLinks.tv.map(link => {
                    const className = segment[0] === 'tv' && segment[2] === link.translation ? "link--active" : "link"
                    return (
                        <Link className={className} key={link.id} locale={locale} href={link.url}>
                            {t(link.translation as TVSeriesCategoryType)}
                        </Link>
                    );
                })
            }
        </nav>
    );
};

export const MainNav = ({
    onMouseEnterLink,
    ref,
}: {
    onMouseEnterLink: (linkName: string) => void
    ref: RefObject<HTMLElement | null>
}) => {
    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav.main");

    const segment = useSelectedLayoutSegments();

    return (
        <nav className="nav main-nav" ref={ref}>
            {
                navLinks.main.map(link => {
                    const className = segment[0] === link.translation /*&& segment.length === 1 */ ? "link--active" : "link";
                    return (
                        <Link className={className} key={link.id} locale={locale} href={link.url}
                            onMouseEnter={() => onMouseEnterLink(link.name)}>
                            {t(link.translation as "movies" | "tv")}
                        </Link>
                    );
                })
            }
        </nav>
    );
}