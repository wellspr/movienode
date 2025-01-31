"use client";

import Image from "next/image";
import { baseImageUrl, paths } from "@/config";
import { Scroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieType } from "@/types";
import { IconMovie } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { ListMarkers } from "../ListMarkers";
import { Scroller } from "../Scroller";

export const List = ({ results, scroll, appendItem }: { results: MovieType[], scroll: Scroll, appendItem?: React.ReactNode }) => {

    const params = useParams();
    const locale = params.locale as Locale;
    /* 
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
     */
    return (
        <div className={`horizontal-list-container`}>
            <Scroller>
                <ul className={`horizontal-list`} ref={scroll.containerRef}>
                    {
                        results.map((movie) => {
                            return (
                                <li key={movie.id}
                                    className={`list-card`}>

                                    <div className={`list-card__image`}>
                                        {
                                            movie.poster_path ?
                                                <Image
                                                    src={baseImageUrl(500) + movie.poster_path}
                                                    alt={movie.title}
                                                    fill
                                                    draggable={false}
                                                /> :
                                                <div className={`list-card__image__placeholder`}>
                                                    {movie.title}
                                                    <IconMovie size={40} />
                                                </div>
                                        }
                                    </div>

                                    <div className={`list-card__info`}>
                                        <div className="list-card__info__background-image">
                                            <Image
                                                src={baseImageUrl(500) + movie.backdrop_path}
                                                alt={movie.title}
                                                fill
                                                draggable={false}
                                            />
                                        </div>

                                        <div className="list-card__info__overlay">
                                            <h3 className="list-card__info__overlay__title">
                                                {movie.title}
                                            </h3>
                                            <p className="list-card__info__overlay__release-date">
                                                {movie.release_date.split('-')[0]}
                                            </p>
                                            <p className="list-card__info__overlay__overview">
                                                {movie.overview.substring(0, 300)}
                                                {movie.overview.length > 300 && "..."}
                                            </p>
                                        </div>

                                        <Link href={paths.movies(String(movie.id))} locale={locale}
                                            className="list-card__info__link">
                                            View
                                        </Link>

                                    </div>
                                </li>
                            );
                        })
                    }
                    {
                        appendItem &&
                        <div className="list-card list-card--appended">
                            {appendItem}
                        </div>
                    }
                </ul>
            </Scroller>

            <ListMarkers
                currentScrollPage={scroll.currentScrollPage}
                markerRef={scroll.markerRef}
                totalScrollPages={scroll.totalScrollPages}
                isOverflown={scroll.isOverflown}
            />
        </div>
    );
};