"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useScroll = () => {

    const containerRef = useRef<HTMLUListElement>(null);

    const [isOverflown, setIsOverflown] = useState<boolean>(false);

    useEffect(() => {
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
        });

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            e.preventDefault();

            containerRef.current?.scrollBy({
                left: 2 * e.deltaY,
                behavior: "smooth",
            });
        }

        const container = containerRef.current;

        if (container) {
            resize.observe(container);
            container.addEventListener("wheel", onWheel);
        }

        return () => {
            if (container) {
                resize.unobserve(container);
                container.removeEventListener("wheel", onWheel);
            }
        }
    }, []);

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
        isOverflown,
    };
};