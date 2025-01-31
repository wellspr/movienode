"use client";

import { paths } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { GenresType } from "@/types";

export const TVSeriesGenresList = ({ genres, locale }: { genres: GenresType, locale: Locale }) => {
    return (
        <div className="genres">
            <ul className="genres__list">
                {
                    genres.map(genre => {
                        return (
                            <Link key={genre.id}
                                href={paths.tv_genres(String(genre.id))} locale={locale}
                                className="genres__list__item pillbox">
                                {genre.name}
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
};