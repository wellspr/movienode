import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import type { MovieCreditsType } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Credits = ({ movieCredits }: { movieCredits: MovieCreditsType }) => {

    return (
        <div className="movie-credits">

            <Cast cast={movieCredits.cast} />

            <Crew crew={movieCredits.crew} />

        </div>
    );
};

const Cast = ({ cast }: { cast: MovieCreditsType['cast'] }) => {

    const { containerRef, buttonLeftRef, buttonRightRef, isOverflown, scrollLeft, scrollRight } = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__cast">
            <h4>{t("cast")}</h4>

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
                                <div className="movie-credits__list__item__profile-pic-wrapper">
                                    {
                                        entry.profile_path ?
                                            <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill /> :
                                            <div className="movie-credits__list__item__profile-pic-no-image">
                                                {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]} 
                                                {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                            </div>
                                    }
                                </div>
                                <h3 className="movie-credits__list__item__name">{entry.name}</h3>
                                <p className="movie-credits__list__item__character">
                                    <span>(</span> {entry.character} <span>)</span>
                                </p>
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
        </div>
    );
};

const Crew = ({ crew }: { crew: MovieCreditsType['crew'] }) => {

    const { containerRef, buttonLeftRef, buttonRightRef, isOverflown, scrollLeft, scrollRight } = useScroll();

    const t = useTranslations('Movie.Credits');

    return (
        <div className="movie-credits__crew">
            <h4>{t('crew')}</h4>

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
                                <div className="movie-credits__list__item__profile-pic-wrapper">
                                    {
                                        entry.profile_path ?
                                            <Image src={baseImageUrl() + entry.profile_path} alt={entry.name} fill /> :
                                            <div className="movie-credits__list__item__profile-pic-no-image">
                                                {entry.name.split(' ')[0] && entry.name.split(' ')[0][0]} 
                                                {entry.name.split(' ')[1] && entry.name.split(' ')[1][0]}
                                            </div>
                                    }
                                </div>
                                <h3 className="movie-credits__list__item__name">{entry.name}</h3>
                                <p className="movie-credits__list__item__job">{entry.job}</p>
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
        </div>
    );
};