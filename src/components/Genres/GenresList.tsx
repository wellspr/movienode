"use client";

import { paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieGenresType } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const GenresList = ({ genres, locale }: { genres: MovieGenresType, locale: Locale }) => {

    const { containerRef, buttonLeftRef, buttonRightRef, scrollLeft, scrollRight, isOverflown } = useScroll({ wheelScroll: true });

    return (
        <div className="genres">
            <div className="genres__navigation-button">
                {
                    isOverflown &&
                    <button className="icon genres__icon genres__icon--left"
                        ref={buttonLeftRef}
                        onClick={scrollLeft}>
                        <IconChevronLeft />
                    </button>
                }
            </div>
            <div className="genres__list__form-wrapper">

                <ul className="genres__list" ref={containerRef}>
                    {
                        genres.map(genre => {
                            return (
                                <Link key={genre.id}
                                    href={paths.genres(String(genre.id))} locale={locale}
                                    className="genres__list__item pillbox">
                                    {genre.name}
                                </Link>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="genres__navigation-button">
                {
                    isOverflown &&
                    <button className="icon genres__icon genres__icon--right"
                        ref={buttonRightRef}
                        onClick={scrollRight}>
                        <IconChevronRight />
                    </button>
                }
            </div>
        </div>
    );
};