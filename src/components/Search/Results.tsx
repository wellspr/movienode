import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { MovieType, PersonDetailsType } from "@/types";
import Image from "next/image";

export const MovieResults = ({ results }: { results: MovieType[] }) => {
    return (
        <ul className="search-results__list">
            {
                results.map((result) => {
                    return (
                        <li key={result.id} className="search-results__list__item">
                            <Link href={`/movie/${result.id}`} draggable={false}>
                                <div className="movie-poster">
                                    {
                                        result.poster_path ?
                                            <Image src={baseImageUrl() + result.poster_path} alt={result.title} width={200} height={300} draggable={false}/> :
                                            <div className="movie-poster__placeholder">
                                                {result.title}
                                            </div>
                                    }
                                </div>
                                <div className="movie-info">
                                    <h3>{result.title} {result.release_date && result.release_date.split('-')[0]} </h3>
                                    {/* <p>{result.overview}</p> */}
                                </div>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export const PersonResults = ({results}: {results: PersonDetailsType[]}) => {    
    return (
        <ul className="search-results__list">
            {
                results.map((result) => {
                    return (
                        <li key={result.id} className="search-results__list__item">
                            <Link href={`/person/${result.id}`} draggable={false}>
                                <div className="movie-poster">
                                    {
                                        result.profile_path ?
                                            <Image src={baseImageUrl() + result.profile_path} alt={result.name} width={200} height={300} draggable={false}/> :
                                            <div className="movie-poster__placeholder">
                                                {result.name}
                                            </div>
                                    }
                                </div>
                                <div className="movie-info">
                                    <h3>{result.name} {result.place_of_birth} </h3>
                                    {/* <p>{result.overview}</p> */}
                                </div>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
};