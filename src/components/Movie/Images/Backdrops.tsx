"use client";

import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { BackdropsType } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export const Backdrops = ({ backdrops }: { backdrops?: BackdropsType }) => {

    const { scrollLeft, scrollRight, containerRef, buttonLeftRef, buttonRightRef, isOverflown } = useScroll();

    const { movieId, locale } = useParams();

    return (
        <>
            {
                isOverflown &&
                <button className="icon movie-images__nav-button movie-images__nav-button--left"
                    ref={buttonLeftRef}
                    onClick={scrollLeft}>
                    <IconChevronLeft size={30} />
                </button>
            }
            <ul className="movie-images__list" ref={containerRef}>
                {
                    backdrops && backdrops.map(image => {
                        return (
                            <li key={image.file_path} className="movie-images__list__item">
                                <Link
                                    href={`/details/${movieId}/images?focusedImage=${image.file_path}`}
                                    locale={locale as Locale}>
                                    <Image
                                        src={baseImageUrl(500) + image.file_path}
                                        alt={image.file_path}
                                        fill
                                    />
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
            {
                isOverflown &&
                <button className="icon movie-images__nav-button movie-images__nav-button--right"
                    ref={buttonRightRef}
                    onClick={scrollRight}>
                    <IconChevronRight size={30} />
                </button>
            }
        </>
    );
};

