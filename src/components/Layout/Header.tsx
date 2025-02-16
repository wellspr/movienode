"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams, usePathname } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { MainNav, MoviesNav, TVNav } from "./HeaderNav";
import { IconMenu2, IconSearch, IconWorld } from "@tabler/icons-react";
import { appName, paths } from "@/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthWidget } from "@/app/[locale]/(auth)/components/AuthWidget";

export const Header = () => {
    const params = useParams();
    const locale = params.locale as Locale;
    const ref = useHeaderScroll();
    const path = usePathname();

    const [mediaMenu, setMediaMenu] = useState<string | undefined>(undefined);

    const onEnterLink = useCallback((link: string) => {
        setMediaMenu(link);
    }, []);

    const mainNavRef = useRef<HTMLElement>(null);
    const tvPopoverRef = useRef<HTMLDivElement>(null);
    const moviesPopoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseOver = (e: MouseEvent) => {
            const currentMainNavRef = mainNavRef.current;
            const currentTvRef = tvPopoverRef.current;
            const currentMoviesRef = moviesPopoverRef.current;
            const node = e.target as Node;

            if (
                currentTvRef?.contains(node) ||
                currentMoviesRef?.contains(node) ||
                currentMainNavRef?.contains(node)
            ) {
                return null;
            }

            setMediaMenu(undefined);
        };

        document.body.addEventListener("mouseover", onMouseOver);

        return () => {
            document.body.removeEventListener("mouseover", onMouseOver);
        }
    }, []);

    useEffect(() => {
        setMediaMenu(undefined);
    }, [path]);

    return (
        <header className="header" ref={ref}>
            <div className="header__top">
                <Link href={`/menu`} className="header__icon-menu">
                    <IconMenu2 />
                </Link>

                <Link className="header__link" href={paths.home()} locale={locale}>
                    <h1 className="header__link__text app-title">
                        {appName}
                    </h1>
                </Link>

                <MainNav
                    ref={mainNavRef}
                    onMouseEnterLink={onEnterLink}
                />

                <div className="header__tools">
                    <Link className="button-search" href={paths.search()} locale={locale}>
                        <IconSearch />
                    </Link>

                    <Language />

                    <AuthWidget locale={locale} />
                </div>
            </div>
            {
                (mediaMenu && mediaMenu.toLowerCase() === 'tv') &&
                <div className="header__navigation__dropdown" ref={tvPopoverRef}>
                    <TVNav />
                </div>
            }
            {
                (mediaMenu && mediaMenu.toLowerCase() === "movies") &&
                <div className="header__navigation__dropdown" ref={moviesPopoverRef}>
                    <MoviesNav />
                </div>
            }
        </header>
    );
};


const Language = () => {

    const iconRef = useRef<HTMLDivElement>(null);
    const switcherRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const onMouseOver = (e: MouseEvent) => {
            const node = e.target as Node;

            const currentIconRef = iconRef.current;
            const currentSwitcherRef = switcherRef.current;

            if (currentIconRef?.contains(node) || currentSwitcherRef?.contains(node)) {
                return null;
            }

            setShow(false);
        }

        document.body.addEventListener("mouseover", onMouseOver);

        return () => {
            document.body.removeEventListener("mouseover", onMouseOver);
        }
    }, []);

    return (
        <div className="language">
            <div className="language__icon" ref={iconRef}
                onMouseOver={() => setShow(true)}>
                <IconWorld />
            </div>
            {
                show &&
                <div className="language__switcher" ref={switcherRef}>
                    <LanguageSwitcher />
                </div>
            }
        </div>
    );
}

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
        headerDown();
    });

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