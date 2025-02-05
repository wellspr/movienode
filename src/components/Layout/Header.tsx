"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { MainNav, MoviesNav, TVNav } from "./HeaderNav";
import { IconSearch } from "@tabler/icons-react";
import { appName, paths } from "@/config";
import { useEffect, useRef } from "react";
import { AuthWidget } from "@/app/[locale]/(auth)/components/AuthWidget";

export const Header = () => {
    const params = useParams();
    const locale = params.locale as Locale;
    const ref = useHeaderScroll();
    const active = useSelectedLayoutSegments();

    return (
        <header className="header" ref={ref}>
            <div className="header__top">
                <Link className="header__link" href={paths.home()} locale={locale}>
                    <h1 className="header__link__text app-title">
                        {appName}
                    </h1>
                </Link>

                <MainNav />
                {
                    active[0] === "tv" &&
                    <div className="header__navigation__lg">
                        <TVNav />
                    </div>
                }
                {
                    active[0] === "movies" &&
                    <div className="header__navigation__lg">
                        <MoviesNav />
                    </div>
                }

                <Link className="button-search" href={paths.search()} locale={locale}>
                    <IconSearch />
                </Link>

                <LanguageSwitcher />

                <AuthWidget locale={locale} />
            </div>
            {
                active[0] === "tv" &&
                <div className="header__navigation__sm">
                    <TVNav />
                </div>
            }
            {
                active[0] === "movies" &&
                <div className="header__navigation__sm">
                    <MoviesNav />
                </div>
            }
        </header>
    );
};

const useHeaderScroll = () => {

    const ref = useRef<HTMLElement>(null);

    const headerUp = () => {
        const header = ref.current;
        if (header) {
            header.classList.remove("header__header-down");
            header.classList.add("header__header-up");
        }
    };

    const headerDown = () => {
        const header = ref.current;
        if (header) {
            header.classList.remove("header__header-up");
            header.classList.add("header__header-down");
            header.style.top = header.clientHeight.toString();
        }
    };

    useEffect(() => {
        const onScroll = () => {
            const { y } = document.body.getBoundingClientRect();

            if (y === 0) {
                headerDown();
            }

            const sct = setTimeout(() => {
                const delta = document.body.getBoundingClientRect().y - y;
                if (delta < 0) {
                    headerUp();
                    clearTimeout(sct);
                } else if (delta > 0) {
                    headerDown();
                    clearTimeout(sct);
                }
            }, 50);
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return ref;
};