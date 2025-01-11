"use client";

import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieType } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

export const List = ({ results, row }: { results: MovieType[], row?: boolean }) => {

    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <ul className={row ? `recommendations__list__row` : `recommendations__list`}>
            {
                results.map((movie) => {
                    return (
                        <Link key={movie.id} href={`/details/${movie.id}`} locale={locale}>
                            <div key={movie.id} className={row ? `recommendations__list__row__item` : `recommendations__list__item`}>
                                <div className="movie-poster">
                                    <div className="movie-poster__wrapper">
                                        <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill />
                                    </div>
                                </div>
                                <div className="movie-info">
                                    { !row && <h3 className="movie-info__title">{movie.title}</h3>}
                                    {/* <p>{movie.overview}</p> */}
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </ul>
    );
};