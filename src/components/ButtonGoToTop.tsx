"use client";

import { IconChevronUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const ButtonGoToTop = () => {

    const [show, setShow] = useState<boolean>(false);

    const scrollPageToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const setButtonVisibility = () => {
        if (window.scrollY > window.screenY) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        setButtonVisibility();

        const onScroll = () => {
            setButtonVisibility();
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    if (!show) return null;

    return (
        <div className="go-to-top">
            <button className="icon go-to-top__icon"
                onClick={scrollPageToTop}>
                <IconChevronUp />
            </button>
        </div>
    );
}