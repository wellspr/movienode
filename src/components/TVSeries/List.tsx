"use client";

import Image from "next/image";
import { baseImageUrl, paths } from "@/config";
import { Scroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { TVSeriesType } from "@/types";
import { IconMovie } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { ListMarkers } from "../ListMarkers";
import { Scroller } from "../Scroller";

export const List = ({ results, scroll, appendItem }: { results: TVSeriesType[], scroll: Scroll, appendItem?: React.ReactNode }) => {

    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <div className={`horizontal-list-container`}>
            <Scroller>
                <ul className={`horizontal-list`} ref={scroll.containerRef}>
                    {
                        results.map((series) => {
                            return (
                                <li key={series.id}
                                    className={`list-card`}>

                                    <div className={`list-card__image`}>
                                        {
                                            series.poster_path ?
                                                <Image
                                                    src={baseImageUrl(500) + series.poster_path}
                                                    alt={series.name}
                                                    fill
                                                    draggable={false}
                                                /> :
                                                <div className={`list-card__image__placeholder`}>
                                                    {series.name}
                                                    <IconMovie size={40} />
                                                </div>
                                        }
                                    </div>

                                    <div className={`list-card__info`}>
                                        <div className="list-card__info__background-image">
                                            <Image
                                                src={baseImageUrl(500) + series.backdrop_path}
                                                alt={series.name}
                                                fill
                                                draggable={false}
                                            />
                                        </div>

                                        <div className="list-card__info__overlay">
                                            <h3 className="list-card__info__overlay__title">
                                                {series.name}
                                            </h3>
                                            <p className="list-card__info__overlay__release-date">
                                                {series.first_air_date.split('-')[0]}

                                            </p>
                                            <p className="list-card__info__overlay__overview">
                                                {series.overview}
                                            </p>
                                        </div>

                                        <Link href={paths.tv(String(series.id))} locale={locale}
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