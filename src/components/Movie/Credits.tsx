"use client";

import { baseImageUrl, paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import type { MovieCast, MovieCrew, MovieDetailsType } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ListMarkers } from "../ListMarkers";
import { Scroller } from "../Scroller";
import { ListNavigationButtons } from "../ListNavigationButtons";

type MovieCredits = {
    id: string,
    cast: MovieCast,
    crew: MovieCrew,
}

export const Credits = ({ movie }: { movie: MovieDetailsType }) => {

    const movieCredits = movie.credits as MovieCredits;

    return (
        <div className="movie-credits">

            {movieCredits.cast && <Cast cast={movieCredits.cast} />}

            {movieCredits.crew && <Crew crew={movieCredits.crew} />}

        </div>
    );
};

const Cast = ({ cast }: { cast: MovieCast }) => {

    const scroll = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__cast">
            <div className="movie-credits__cast__header">
                <h4>{t("cast")}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <Scroller>
                <ul className="movie-credits__list" ref={scroll.containerRef}>
                    {
                        cast.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + entry.credit_id + "-" + index} className="movie-credits__list__item">
                                    <Link href={paths.person(String(entry.id))} draggable={false}>
                                        <div className="movie-credits__list__item__profile-pic-wrapper">
                                            {
                                                entry.profile_path ?
                                                    <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill draggable={false} /> :
                                                    <Image src={`https://ui-avatars.com/api/?name=${entry.name}`} alt={entry.name} fill draggable={false} />
                                                    //<div className="movie-credits__list__item__profile-pic-no-image">
                                                    //    {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]}
                                                    //    {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                                    //</div>
                                            }
                                        </div>
                                        <h3 className="movie-credits__list__item__name">{entry.name}</h3>
                                        <p className="movie-credits__list__item__character">
                                            <span> {entry.character} </span>
                                        </p>
                                    </Link>
                                </li>
                            );
                        })
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

const Crew = ({ crew }: { crew: MovieCrew }) => {

    const scroll = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__crew">
            <div className="movie-credits__crew__header">
                <h4>{t('crew')}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <Scroller>
                <ul className="movie-credits__list" ref={scroll.containerRef}>
                    {
                        crew.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + entry.credit_id + "-" + index} className="movie-credits__list__item">
                                    <Link href={paths.person(String(entry.id))} draggable={false}>
                                        <div className="movie-credits__list__item__profile-pic-wrapper">
                                            {
                                                entry.profile_path ?
                                                    <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill draggable={false} /> :
                                                    <Image src={`https://ui-avatars.com/api/?name=${entry.name}`} alt={entry.name} fill draggable={false} />
                                                    //<div className="movie-credits__list__item__profile-pic-no-image">
                                                    //    {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]}
                                                    //    {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                                    //</div>
                                            }
                                        </div>
                                        <h3 className="movie-credits__list__item__name">{entry.name}</h3>
                                        <p className="movie-credits__list__item__job">{entry.job}</p>
                                    </Link>
                                </li>
                            );
                        })
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