"use client";

import { Locale } from "@/i18n/types";
import { MovieCast, MovieCrew, MovieDetailsType } from "@/types";
import { IconCalendar, IconClock, IconExternalLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Videos } from "./Videos";
import { Credits } from "./Credits";
import { Genres } from "./Genres";
import { ProductionCountries } from "./ProductionCountries";
import { ProductionCompanies } from "./ProductionCompanies";
import { Poster } from "./Poster";
import { Backdrops } from "./Images/Backdrops";
import { WatchProviders } from "./WatchProviders";
import { List } from "./List";
import { Certification } from "./Certification";
import Image from "next/image";
import { baseImageUrl } from "@/config";

export const Movie = ({ movie, locale }: { movie: MovieDetailsType, locale: Locale }) => {

    const t = useTranslations("Movie");

    return (
        <div className="movie">
            <div className="movie__header"></div>

            <div className="movie__main">
                <section className="primary">

                    <div className="primary__background-image">
                        <Image
                            src={baseImageUrl() + movie.backdrop_path}
                            alt=""
                            fill
                        />
                    </div>

                    <div className="primary__hero">
                        <Poster movie={movie} />

                        <div className="movie-info">
                            <h2 className="movie-info__title">{movie.title}</h2>
                            <h3 className="movie-info__tagline">{movie.tagline}</h3>
                            <p className="movie-info__overview">{movie.overview}</p>
                            {
                                /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */
                                movie.release_date &&
                                <p className="movie-info__release-date">
                                    <IconCalendar size={18} />
                                    {t('release_date')}: {new Intl.DateTimeFormat(locale).format(new Date(movie.release_date))}
                                </p>
                            }
                            {
                                movie.homepage &&
                                <Link className="link movie-info__link" href={movie.homepage} target="_blank">
                                    {movie.homepage} <IconExternalLink />
                                </Link>
                            }
                            {
                                movie.release_dates &&
                                <Certification locale={locale} releaseDates={movie.release_dates} />
                            }
                            {
                                movie.runtime ?
                                <div className="movie-info__runtime">
                                    <IconClock size={18} />
                                    {movie.runtime}
                                    <span>min</span>
                                </div> : null
                            }
                            {
                                movie.genres && movie.genres.length > 0 &&
                                <div className="movie-info__genres">
                                    <Genres movieGenres={movie.genres} />
                                </div>
                            }
                        </div>
                    </div>
                </section>

                <section className="secondary">
                    <div className="movie-external">
                        {
                            movie.watch_providers &&
                            movie.watch_providers.results &&
                            movie.watch_providers.results[locale.split('-')[1]] &&
                            <WatchProviders
                                locale={locale}
                                watchProviders={movie.watch_providers}
                            />
                        }
                        <div className="links-to-external-databases">
                            {
                                movie.imdb_id &&

                                <Link className="link link-to-imdb" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                                    <span>View on IMDB </span>
                                    <IconExternalLink size={20} />
                                </Link>

                            }

                            <Link className="link link-to-tmdb" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">
                                <span>View on TMDB </span>
                                <IconExternalLink size={20} />
                            </Link>
                        </div>
                    </div>
                    {
                        movie.recommendations &&
                        movie.recommendations.results &&
                        movie.recommendations.results.length > 0 &&
                        <div className="movie-recommendations">
                            <div className="movie-recommendations__header">
                                <h4>{t('recommendations')}</h4>
                                <Link className="link" href={`/recommendations/${movie.id}`}>
                                    More
                                </Link>
                            </div>
                            {
                                movie.recommendations &&
                                <List results={movie.recommendations.results} row />
                            }
                        </div>
                    }
                    {
                        movie.similar &&
                        movie.similar.results &&
                        movie.similar.results.length > 0 &&
                        <div className="movie-similar">
                            <div className="movie-similar__header">
                                <h4>{t('similar')}</h4>
                                <Link className="link" href={`/similar/${movie.id}`}>
                                    More
                                </Link>
                            </div>
                            {
                                movie.similar &&
                                <List results={movie.similar.results} row />
                            }
                        </div>
                    }

                    <Credits movieCredits={movie.credits as { id: string, cast: MovieCast, crew: MovieCrew }} />

                    {
                        movie.production_countries && movie.production_countries.length > 0 &&
                        <div className="movie-production-countries">
                            <h4>{t('country', { count: movie.production_countries.length })}</h4>
                            <div className="movie-production-countries__list">
                                <ProductionCountries movieProductionCountries={movie.production_countries} />
                            </div>
                        </div>
                    }

                    {
                        movie.production_companies && movie.production_companies.length > 0 &&
                        <div className="movie-production-companies">
                            <ProductionCompanies movieProductionCompanies={movie.production_companies} />
                        </div>
                    }

                    {
                        movie.images && movie.images.backdrops.length > 0 &&
                        <div className="movie-images">
                            <h4>{t("image_gallery")}</h4>
                            <Backdrops backdrops={movie.images.backdrops} />
                        </div>
                    }

                    <div className="movie-videos">
                        <Videos movieVideos={movie.videos} />
                    </div>
                </section>
            </div>

            <div className="movie__footer"></div>
        </div>
    );
};