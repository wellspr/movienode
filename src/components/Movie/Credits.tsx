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

    const { containerRef, isOverflown, scrollLeft, scrollRight } = useScroll();

    const t = useTranslations('MovieCredits');

    return (
        <div className="movie-credits__cast">
            <h4>{t('cast')}</h4>

            {
                isOverflown &&
                <button className="icon circle-button circle-button--left"
                    onClick={scrollLeft}>
                    <IconChevronLeft size={30} />
                </button>
            }
            <ul className="movie-credits__list" ref={containerRef}>
                {
                    cast.map(entry => {
                        return (
                            <li key={entry.id} className="movie-credits__list__item">
                                <div className="movie-credits__list__item__profile-pic-wrapper">
                                    <Image src={baseImageUrl(500) + entry.profile_path} alt={entry.name} fill />
                                </div>
                                <h3 className="movie-credits__list__item__name">{entry.name}</h3>
                                <p className="movie-credits__list__item__character">({entry.character})</p>
                            </li>
                        );
                    })
                }
            </ul>
            {
                isOverflown &&
                <button className="icon circle-button circle-button--right"
                    onClick={scrollRight}>
                    <IconChevronRight size={30} />
                </button>
            }
        </div>
    );
};

const Crew = ({ crew }: { crew: MovieCreditsType['crew'] }) => {

    const { containerRef, isOverflown, scrollLeft, scrollRight } = useScroll();

    const t = useTranslations('MovieCredits');

    return (
        <div className="movie-credits__crew">
            <h4>{t('crew')}</h4>

            {
                isOverflown &&
                <button className="icon circle-button circle-button--left"
                    onClick={scrollLeft}>
                    <IconChevronLeft size={30} />
                </button>
            }
            <ul className="movie-credits__list" ref={containerRef}>
                {
                    crew.map(entry => {
                        return (
                            <li key={entry.id + "-" + entry.job} className="movie-credits__list__item">
                                <div className="movie-credits__list__item__profile-pic-wrapper">
                                    <Image src={baseImageUrl(500) + entry.profile_path} alt={entry.name} fill />
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
                    onClick={scrollRight}>
                    <IconChevronRight size={30} />
                </button>
            }
        </div>
    );
}