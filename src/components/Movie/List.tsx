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
import { ListMarkers } from "../ListMarkers";
import { Scroller } from "../Scroller";

export const List = ({ results, row }: { results: MovieType[], row?: boolean }) => {

    const params = useParams();
    const locale = params.locale as Locale;

    const {
        containerRef,
        markerRef,
        buttonLeftRef,
        buttonRightRef,
        isOverflown,
        scrollLeft,
        scrollRight,
        totalScrollPages,
        currentScrollPage
    } = useScroll();

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
            <Scroller>
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
                                <li key={movie.id}
                                    className={row ? `movie-list-horizontal__item` : `movie-list__item`}>

                                    <div className={row ? `movie-list-horizontal__item__image` : `movie-list__item__image`}
                                        onMouseOver={handleMouseOver}>
                                        {
                                            movie.poster_path ?
                                                <Image
                                                    src={baseImageUrl(500) + movie.poster_path}
                                                    alt={movie.title}
                                                    fill
                                                    draggable={false}
                                                /> :
                                                <div className={row ? `movie-list-horizontal__item__image__placeholder` : `movie-list__item__image__placeholder`}>
                                                    {movie.title}
                                                    <IconMovie size={40} />
                                                </div>
                                        }
                                    </div>

                                    <div className={row ? `movie-list-horizontal__item__info` : `movie-list__item__info`}>
                                        <div className="movie-list-horizontal__item__info__background-image">
                                            <Image
                                                src={baseImageUrl(500) + movie.backdrop_path}
                                                alt={movie.title}
                                                fill
                                                draggable={false}
                                            />
                                        </div>

                                        <div className="movie-list-horizontal__item__info__overlay">
                                            <h3 className="movie-list-horizontal__item__info__overlay__title">
                                                {movie.title}
                                            </h3>
                                            <p className="movie-list-horizontal__item__info__overlay__release-date">
                                                {movie.release_date.split('-')[0]}

                                            </p>
                                            <p className="movie-list-horizontal__item__info__overlay__overview">
                                                {movie.overview}
                                            </p>
                                        </div>

                                        <Link href={`/movie/${movie.id}`} locale={locale}
                                            className="movie-list-horizontal__item__info__link">
                                            View
                                        </Link>

                                    </div>
                                </li>
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
            </Scroller>
            <ListMarkers
                currentScrollPage={currentScrollPage}
                markerRef={markerRef}
                totalScrollPages={totalScrollPages}
                isOverflown={isOverflown}
            />
        </div>
    );
};