"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Config = {
    wheelScroll?: boolean
}

export type Scroll = {
    scrollLeft: () => void
    scrollRight: () => void
    containerRef: React.RefObject<HTMLUListElement | null>
    markerRef: React.RefObject<HTMLDivElement | null>
    buttonLeftRef: React.RefObject<HTMLButtonElement | null>
    buttonRightRef: React.RefObject<HTMLButtonElement | null>
    isOverflown: boolean
    totalScrollPages: number
    currentScrollPage: number
    buttonLeftDisabled: boolean
    buttonRightDisabled: boolean
}

export const useScroll = (config?: Config) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);
    const buttonLeftRef = useRef<HTMLButtonElement>(null);
    const buttonRightRef = useRef<HTMLButtonElement>(null);

    const [isOverflown, setIsOverflown] = useState<boolean>(false);

    const [totalScrollPages, setTotalScrollPages] = useState<number>(0);
    const [currentScrollPage, setCurrentScrollPage] = useState<number>(0);

    const [buttonLeftDisabled, setButtonLeftDisabled] = useState<boolean>(false);
    const [buttonRightDisabled, setButtonRightDisabled] = useState<boolean>(false);

    const updateMarkers = useCallback((container: HTMLUListElement | null) => {
        const date = Date.now();
        if (container) {
            const total = container.scrollWidth / container.clientWidth;
            const position = (container.scrollLeft + container.clientWidth) / container.clientWidth;
            setTotalScrollPages(Math.ceil(total));
            setCurrentScrollPage(Math.ceil(position));
            console.log("Time: ",  Date.now() - date);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;

        updateMarkers(container);

        const manageButtons = (container: HTMLUListElement) => {
            if (container.scrollLeft > 10) {
                setButtonLeftDisabled(false);
            } else {
                setButtonLeftDisabled(true);
            }
            if (container.scrollWidth - container.scrollLeft - container.getBoundingClientRect().width < 10) {
                setButtonRightDisabled(true);
            } else {
                setButtonRightDisabled(false);
            }
        }

        if (container) {
            manageButtons(container);
        }

        const handleScroll = () => {
            if (container) {
                manageButtons(container);
                updateMarkers(container);
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

    }, [containerRef, buttonLeftRef, buttonRightRef, updateMarkers]);


    /* Manage resizes */
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

            if (container) {
                const elements = container.childNodes;

                const node = Object.values(elements).find(element => {
                    const node = element as HTMLElement;
                    const left = node.getBoundingClientRect().left;
                    if (left > 0) {
                        return node;
                    }
                }) as HTMLElement;

                if (node) {
                    const nodeLeft = node.getBoundingClientRect().left;
                    
                    container.scrollBy({
                        behavior: "instant",
                        left: nodeLeft - container.getBoundingClientRect().left - 15,
                    });
                }
            }

            updateMarkers(container);
        });

        if (container) {
            resize.observe(container);
        }

        return () => {
            if (container) {
                resize.unobserve(container);
            }
        }
    }, [config, updateMarkers]);


    /* Managing wheel scrolling */
    useEffect(() => {
        const container = containerRef.current;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            containerRef.current?.scrollBy({
                left: 2 * e.deltaY,
                behavior: "smooth",
            });
        }

        if (container) {
            if (config && config.wheelScroll) {
                container.addEventListener("wheel", onWheel);
            }
        }

        return () => {
            if (container) {
                if (config && config.wheelScroll) {
                    container.removeEventListener("wheel", onWheel);
                }
            }
        }
    }, [config]);

    const scrollLeft = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: -container.clientWidth,
                behavior: "smooth",
            });
        }
    }, []);

    const scrollRight = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: container.clientWidth,
                behavior: "smooth",
            });
        }
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
        currentScrollPage,
        buttonLeftDisabled,
        buttonRightDisabled,
    };
};