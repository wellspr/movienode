import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { MovieType } from "@/types";
import Image from "next/image";

export const Results = ({ results }: { results: MovieType[] }) => {
    return (
        <ul className="search-results__list">
            {
                results.map((result) => {
                    return (
                        <li key={result.id} className="search-results__list__item">
                            <Link href={`/details/${result.id}`} draggable={false}>
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
