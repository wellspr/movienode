"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Config = { wheelScroll: boolean }

export const useScroll = (config?: Config) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);
    const buttonLeftRef = useRef<HTMLButtonElement>(null);
    const buttonRightRef = useRef<HTMLButtonElement>(null);

    const [isOverflown, setIsOverflown] = useState<boolean>(false);

    const [totalScrollPages, setTotalScrollPages] = useState<number>(0);
    const [currentScrollPage, setCurrentScrollPage] = useState<number>(0);

    const updateMarkers = (container: HTMLUListElement | null) => {
        if (container) {
            const total = Math.round(container.scrollWidth / container.clientWidth);
            const position = Math.round((container.scrollLeft + container.clientWidth) / container.clientWidth);
            setTotalScrollPages(total);
            setCurrentScrollPage(position);
        };
    };

    useEffect(() => {
        const container = containerRef.current;

        updateMarkers(container);

        const handleScroll = (e: Event) => {
            const buttonLeft = buttonLeftRef.current;
            const buttonRight = buttonRightRef.current;
            const target = e.target as Element;

            if (buttonLeft) {
                if (target.scrollLeft > 100) {
                    buttonLeft.classList.add("show")
                } else {
                    buttonLeft.classList.remove("show")
                }
            }

            if (buttonRight) {
                if (container) {
                    if (target.scrollWidth - target.scrollLeft - container.getBoundingClientRect().width < 100) {
                        buttonRight.classList.add("hide");
                    } else {
                        buttonRight.classList.remove("hide");
                    }
                    updateMarkers(container);
                }
            }
        }

        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        }

    }, [containerRef, buttonLeftRef, buttonRightRef]);

    useEffect(() => {
        const container = containerRef.current;

        const resize = new ResizeObserver(() => {

            const props = {
                elWidth: containerRef.current?.clientWidth,
                scrollWidth: containerRef.current?.scrollWidth,
            };

            if (props.scrollWidth && props.elWidth) {
                if (props.scrollWidth > props.elWidth) {
                    setIsOverflown(true);
                } else {
                    setIsOverflown(false);
                }
            }

            updateMarkers(container);
        });

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            e.preventDefault();

            containerRef.current?.scrollBy({
                left: 2 * e.deltaY,
                behavior: "smooth",
            });
        }

        if (container) {
            resize.observe(container);

            if (config && config.wheelScroll) {
                container.addEventListener("wheel", onWheel);
            }
        }

        return () => {
            if (container) {
                resize.unobserve(container);
                if (config && config.wheelScroll) {
                    container.removeEventListener("wheel", onWheel);
                }
            }
        }
    }, [config]);

    const scrollLeft = useCallback(() => {
        containerRef.current?.scrollBy({
            left: -containerRef.current.clientWidth,
            behavior: "smooth",
        });
    }, []);

    const scrollRight = useCallback(() => {
        containerRef.current?.scrollBy({
            left: containerRef.current.clientWidth,
            behavior: "smooth",
        });
    }, []);

    return {
        scrollLeft,
        scrollRight,
        containerRef,
        markerRef,
        buttonLeftRef,
        buttonRightRef,
        isOverflown,
        totalScrollPages,
        currentScrollPage
    };
};