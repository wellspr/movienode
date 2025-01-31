import Image from "next/image";
import { Locale } from "@/i18n/types";
import { MovieDetailsType } from "@/types";
import { Videos } from "./Videos";
import { Credits } from "./Credits";
import { Genres } from "./Genres";
import { ProductionCountries } from "./ProductionCountries";
import { ProductionCompanies } from "./ProductionCompanies";
import { Poster } from "./Poster";
import { WatchProviders } from "./WatchProviders";
import { Certification } from "./Certification";
import { baseImageUrl } from "@/config";
import { Title } from "./Title";
import { Tagline } from "./Tagline";
import { Overview } from "./Overview";
import { ReleaseDate } from "./ReleaseDate";
import { Homepage } from "./Homepage";
import { Runtime } from "./Runtime";
import { Databases } from "./Databases";
import { RecommendationsList } from "./Recommendations/RecommendationsList";
import { SimilarList } from "./Similar/SimilarList";
import { MovieImages } from "./Images/MovieImages";
import { Collection } from "./Collection";
import { SpokenLanguages } from "./SpokenLanguages";
import { OriginalTitle } from "./OriginalTitle";


export const Movie = ({ movie, locale }: { movie: MovieDetailsType, locale: Locale }) => {

    console.log("Adult: ", movie.adult, movie.release_dates);
    return (
        <div className="movie">
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
                        <Title className="movie-info" movie={movie} />
                        <OriginalTitle className="movie-info" movie={movie} />
                        <Tagline className="movie-info" movie={movie} />
                        <Overview className="movie-info" movie={movie} />
                        <Homepage className="movie-info" movie={movie} />
                        <Certification locale={locale} movie={movie} />
                        {
                            movie.adult && <p>Adult { movie.adult }</p>
                        }
                        {
                            <div className="movie-info__row">
                                <ReleaseDate className="movie-info" movie={movie} />
                                <Runtime className="movie-info" movie={movie} />
                                <SpokenLanguages className="movie-info" movie={movie} />
                            </div>
                        }
                        <Genres className="movie-info" movie={movie} />
                    </div>
                </div>
            </section>

            <section className="secondary">
                <Collection locale={locale} movie={movie} />

                <WatchProviders
                    locale={locale}
                    movie={movie}
                    className="movie-external"
                />

                <Databases className="movie-external" movie={movie} />

                <RecommendationsList movie={movie} />

                <SimilarList movie={movie} />

                <Credits movie={movie} />

                <ProductionCountries movie={movie} />

                <ProductionCompanies movie={movie} />

                <MovieImages movie={movie} />

                <Videos movieVideos={movie.videos} />
            </section>
        </div >
    );
};