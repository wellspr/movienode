"use client";

import { baseImageUrl } from "@/config";
import { Locale } from "@/i18n/types";
import { MovieDetails as Movie } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { MovieImages } from "./MovieImages";
import { MovieVideos } from "./MovieVideos";

export const MovieDetails = ({ movie, locale }: { movie: Movie, locale: Locale }) => {

    const t = useTranslations("Movie");

    console.log(movie.images, movie.videos, movie.production_companies);

    return (
        <div className="movie">
            <div className="movie__header"></div>
            <div className="movie__main">
                <div className="movie__image">
                    <div className="movie__image__wrapper">
                        <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill />
                    </div>
                </div>
                <div className="movie__info">
                    <h2 className="movie__info__title">{movie.title}</h2>
                    <h3 className="movie__info__tagline">{movie.tagline}</h3>
                    <p className="movie__info__overview">{movie.overview}</p>
                    {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */}
                    <p>{t('release_date')}: {new Intl.DateTimeFormat(locale).format(new Date(movie.release_date))}</p>
                    {
                        movie.homepage &&
                        <Link className="link movie__info__link" href={movie.homepage} target="_blank">
                            {movie.homepage} <IconExternalLink />
                        </Link>
                    }
                    <p className="movie__info__status">{movie.status}</p>

                    <ul className="movie__info__genres">
                        {
                            movie.genres.map((genre) => {
                                return (
                                    <li className="pillbox" key={genre.id}>
                                        {genre.name}
                                    </li>
                                );
                            })
                        }
                    </ul>

                </div>
            </div>

            <div className="movie__production-countries">
                <ul className="movie__production-countries__list">
                    {
                        movie.production_countries.map((country) => {
                            return (
                                <li className="movie__production-countries__list__item" key={country.iso_3166_1}>
                                    {country.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            {
                movie.production_companies && movie.production_companies.length > 0 &&
                <div className="movie__production-companies">
                    <ul className="movie__production-companies__list">
                        {
                            movie.production_companies.map((company) => {
                                return (
                                    <li className="movie__production-companies__list__item" key={company.id}>
                                        <div className="movie__production-companies__list__item__logo">
                                            {
                                                company.logo_path ?
                                                    <Image
                                                        className="movie__production-companies__list__item__logo__image"
                                                        src={baseImageUrl() + company.logo_path}
                                                        alt={company.name}
                                                        fill
                                                    /> :
                                                    <div className="movie__production-companies__list__item__logo__company-name">
                                                        {company.name}
                                                    </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            }
            <MovieImages movieImages={movie.images} />
            <MovieVideos movieVideos={movie.videos} />
            <div className="movie__footer"></div>
        </div>
    );
}

