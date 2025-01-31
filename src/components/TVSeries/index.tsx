import Image from "next/image";
import { Locale } from "@/i18n/types";
import { TVSeriesDetailsType } from "@/types";
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
import { Databases } from "./Databases";
import { RecommendationsList } from "./Recommendations/RecommendationsList";
import { SimilarList } from "./Similar/SimilarList";
import { MovieImages } from "./Images/MovieImages";
import { SpokenLanguages } from "./SpokenLanguages";
import { OriginalTitle } from "./OriginalTitle";
import { SeasonsInfo } from "./Seasons/SeasonsInfo";
import { SeasonsList } from "./Seasons/SeasonsList";


export const TVSeries = ({ series, locale }: { series: TVSeriesDetailsType, locale: Locale }) => {
    return (
        <div className="movie">
            <section className="primary">

                <div className="primary__background-image">
                    <Image
                        src={baseImageUrl() + series.backdrop_path}
                        alt=""
                        fill
                    />
                </div>

                <div className="primary__hero">
                    <Poster series={series} />

                    <div className="movie-info">
                        <Title className="movie-info" series={series} />
                        <OriginalTitle className="movie-info" series={series} />
                        <Tagline className="movie-info" series={series} />
                        <Overview className="movie-info" series={series} />
                        <Homepage className="movie-info" series={series} />
                        <Certification locale={locale} series={series} />

                        {
                            <div className="movie-info__row">
                                <ReleaseDate className="movie-info" series={series} />
                                {/* <Runtime className="movie-info" series={series} /> */} {/* Show runtime only for episodes */}
                                <SpokenLanguages className="movie-info" series={series} />
                            </div>
                        }
                        <Genres className="movie-info" series={series} />

                        <SeasonsInfo series={series} />
                    </div>
                </div>
            </section>

            <SeasonsList series={series} />

            <section className="secondary">
                <WatchProviders
                    locale={locale}
                    series={series}
                    className="movie-external"
                />

                <Databases className="movie-external" series={series} />

                <RecommendationsList series={series} />

                <SimilarList series={series} />

                <Credits series={series} />

                <ProductionCountries series={series} />

                <ProductionCompanies series={series} />

                <MovieImages series={series} />

                <Videos movieVideos={series.videos} />
            </section>
        </div >
    );
};