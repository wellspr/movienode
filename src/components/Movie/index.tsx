"use client";

import { Locale } from "@/i18n/types";
import { MovieCreditsType, MovieDetailsType } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";
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

export const Movie = ({ movie, locale }: { movie: MovieDetailsType, locale: Locale }) => {

    const t = useTranslations("MovieDetails");

    console.log(movie.vote_average, movie.vote_count);

    return (
        <div className="movie">
            <div className="movie__header"></div>

            <div className="movie__main">
                <section className="primary">
                    <Poster movie={movie} />

                    <div className="movie-info">
                        <h2 className="movie-info__title">{movie.title}</h2>
                        <h3 className="movie-info__tagline">{movie.tagline}</h3>
                        <p className="movie-info__overview">{movie.overview}</p>
                        {
                            /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */
                            movie.release_date &&
                            <p className="movie-info__release-date">{t('release_date')}: {new Intl.DateTimeFormat(locale).format(new Date(movie.release_date))}</p>
                        }
                        {
                            movie.homepage &&
                            <Link className="link movie-info__link" href={movie.homepage} target="_blank">
                                {movie.homepage} <IconExternalLink />
                            </Link>
                        }
                        {
                            movie.genres && movie.genres.length > 0 &&
                            <div className="movie-info__genres">
                                <Genres movieGenres={movie.genres} />
                            </div>
                        }
                        {
                            movie.watch_providers && 
                            movie.watch_providers.results &&
                            movie.watch_providers.results[locale.split('-')[1]] &&
                            <WatchProviders
                                locale={locale}
                                watchProviders={movie.watch_providers}
                            />
                        }
                    </div>
                </section>

                <section className="recommendations">
                    <Link className="button" href={`/details/${movie.id}/recommendations`}>
                        Recommendations
                    </Link>
                    <Link className="button" href={`/details/${movie.id}/similar`}>
                        Similar
                    </Link>
                </section>

                <section className="secondary">
                    <Credits movieCredits={movie.credits as MovieCreditsType} />

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