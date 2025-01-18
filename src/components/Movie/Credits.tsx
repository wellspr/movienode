import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import type { MovieCast, MovieCrew } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ListMarkers } from "../ListMarkers";
import { Scroller } from "../Scroller";

export const Credits = ({ movieCredits }: {
    movieCredits: {
        id: string,
        cast: MovieCast,
        crew: MovieCrew,
    }
}) => {
    return (
        <div className="movie-credits">

            {movieCredits.cast && <Cast cast={movieCredits.cast} />}

            {movieCredits.crew && <Crew crew={movieCredits.crew} />}

        </div>
    );
};

const Cast = ({ cast }: { cast: MovieCast }) => {

    const {
        containerRef,
        buttonLeftRef,
        buttonRightRef,
        isOverflown,
        scrollLeft,
        scrollRight,
        currentScrollPage,
        totalScrollPages,
        markerRef,
    } = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__cast">
            <h4>{t("cast")}</h4>

            <Scroller>
                {
                    isOverflown &&
                    <button className="icon circle-button circle-button--left"
                        ref={buttonLeftRef}
                        onClick={scrollLeft}>
                        <IconChevronLeft size={30} />
                    </button>
                }
                <ul className="movie-credits__list" ref={containerRef}>
                    {
                        cast.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + entry.credit_id + "-" + index} className="movie-credits__list__item">
                                    <Link href={`/person/${entry.id}`} draggable={false}>
                                        <div className="movie-credits__list__item__profile-pic-wrapper">
                                            {
                                                entry.profile_path ?
                                                    <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill draggable={false} /> :
                                                    <div className="movie-credits__list__item__profile-pic-no-image">
                                                        {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]}
                                                        {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                                    </div>
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

const Crew = ({ crew }: { crew: MovieCrew }) => {

    const {
        containerRef,
        buttonLeftRef,
        buttonRightRef,
        isOverflown,
        scrollLeft,
        scrollRight,
        currentScrollPage,
        totalScrollPages,
        markerRef
    } = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__crew">
            <h4>{t('crew')}</h4>

            <Scroller>
                {
                    isOverflown &&
                    <button className="icon circle-button circle-button--left"
                        ref={buttonLeftRef}
                        onClick={scrollLeft}>
                        <IconChevronLeft size={30} />
                    </button>
                }
                <ul className="movie-credits__list" ref={containerRef}>
                    {
                        crew.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + entry.credit_id + "-" + index} className="movie-credits__list__item">
                                    <Link href={`/person/${entry.id}`} draggable={false}>
                                        <div className="movie-credits__list__item__profile-pic-wrapper">
                                            {
                                                entry.profile_path ?
                                                    <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill draggable={false} /> :
                                                    <div className="movie-credits__list__item__profile-pic-no-image">
                                                        {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]}
                                                        {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                                    </div>
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