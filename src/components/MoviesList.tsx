import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieType } from "@/types";
import Image from "next/image";

export const MoviesList = ({ results, locale }: { results: MovieType[], locale: Locale }) => {
    return (
        <div className="movies__list">
            {
                results && results.map((movie: MovieType) => {
                    return (
                        <Link
                            key={movie.id}
                            locale={locale}
                            href={`/details/${movie.id}`}
                            className="movies__list__item__link"
                        >
                            <div className="movies__list__item">
                                <div className="movies__list__item">
                                    <h2 className="movies__list__item__title">{movie.title}</h2>
                                    <div className="movies__list__item__image">
                                        <Image
                                            src={baseImageUrl(500) + movie.poster_path}
                                            alt={movie.title}
                                            fill
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}