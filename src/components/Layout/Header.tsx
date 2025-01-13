"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { HeaderNav } from "./HeaderNav";
import { IconSearch } from "@tabler/icons-react";
import { appName } from "@/config";
import { useEffect, useRef } from "react";


export const Header = () => {
    const params = useParams();
    const locale = params.locale as Locale;
    const ref = useHeaderScroll();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const header = ref.current;
        if (header) {
            header.classList.remove("header__header-up");
            header.classList.remove("header__header-down");
        }
    }, [pathname, searchParams, ref]);

    return (
        <header className="header" ref={ref}>
            <div className="header__top">
                <Link className="header__link" href={"/"} locale={locale}>
                    <h1 className="header__link__text app-title">
                        {appName}
                    </h1>
                </Link>

                <div className="header__navigation__lg">
                    <HeaderNav />
                </div>

                <Link className="button-search" href={"/search"} locale={locale}>
                    <IconSearch />
                </Link>

                <LanguageSwitcher />
            </div>

            <div className="header__navigation__sm">
                <HeaderNav />
            </div>

        </header>
    );
};

const useHeaderScroll = () => {

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {

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

        document.body.onwheel = (e: WheelEvent) => {
            const delta = e.deltaY;

            if (delta < 0) {
                headerDown();
            } else {
                headerUp();
            }
        };

        document.body.onkeydown = (e: KeyboardEvent) => {
            if (["arrowdown", "pagedown", "end"].includes(e.key.toLowerCase())) {
                headerUp();
            }
        }

        document.body.onkeyup = (e: KeyboardEvent) => {
            if (["arrowup", "pageup", "home"].includes(e.key.toLowerCase())) {
                headerDown();
            }
        }
    }, []);

    return ref;
};