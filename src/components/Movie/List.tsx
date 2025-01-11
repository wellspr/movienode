"use client";

import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieType } from "@/types";
import { IconChevronLeft, IconChevronRight, IconMovie } from "@tabler/icons-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export const List = ({ results, row }: { results: MovieType[], row?: boolean }) => {

    const params = useParams();
    const locale = params.locale as Locale;

    const { containerRef, buttonLeftRef, buttonRightRef, isOverflown, scrollLeft, scrollRight } = useScroll();

    const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element;

        const container = containerRef.current;

        if (container && container.lastChild?.contains(target)) {
            container.lastElementChild?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        } else {
            container?.childNodes.forEach(node => {
                const el = node as Element;
                if (el.contains(target)) {
                    el.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                }
            })
        }

    }, [containerRef]);

    return (
        <div className={row ? `movie-list-horizontal-container` : `movie-list-container`}>
            {
                isOverflown &&
                <button className="icon circle-button circle-button--left"
                    ref={buttonLeftRef}
                    onClick={scrollLeft}>
                    <IconChevronLeft size={30} />
                </button>
            }
            <ul className={row ? `movie-list-horizontal` : `movie-list`} ref={containerRef}>
                {
                    results.map((movie) => {
                        return (
                            <Link key={movie.id} href={`/movie/${movie.id}`} locale={locale}
                                className={row ? `movie-list-horizontal__item` : `movie-list__item`}>

                                <div className={row ? `movie-list-horizontal__item__image` : `movie-list__item__image`}
                                    onMouseOver={handleMouseOver}>
                                    {
                                        movie.poster_path ?
                                            <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill /> :
                                            <div className={row ? `movie-list-horizontal__item__image__placeholder` : `movie-list__item__image__placeholder`}>
                                                {movie.title}
                                                <IconMovie size={40} />
                                            </div>
                                    }
                                </div>

                                <div className={row ? `movie-list-horizontal__item__info` : `movie-list__item__info`}>
                                    <h3 className={row ? `movie-list-horizontal__item__info__title` : `movie-list__item__info__title`}>
                                        {movie.title}
                                    </h3>
                                    <p className={row ? `movie-list-horizontal__item__info__release-date` : `movie-list__item__info__release-date`}>
                                        {movie.release_date.split('-')[0]}

                                    </p>
                                    <p className={row ? `movie-list-horizontal__item__info__overview` : `movie-list__item__info__overview`}>
                                        {movie.overview}
                                    </p>
                                </div>
                            </Link>
                        );
                    })
                }
            </ul>
            {
                isOverflown &&
                <button className="icon circle-button circle-button--right"
                    ref={buttonRightRef}
                    onClick={scrollRight}>
                    <IconChevronRight size={30} />
                </button>
            }
        </div>
    );
};