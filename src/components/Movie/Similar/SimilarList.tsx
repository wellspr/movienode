"use client";

import { Link } from "@/i18n/routing";
import { MovieDetailsType } from "@/types";
import { useTranslations } from "next-intl";
import { List } from "../List";

export const SimilarList = ({
    movie,
}: {
    movie: MovieDetailsType
}) => {

    const t = useTranslations("Movie");

    if (!movie.similar) return null;
    if (!movie.similar.results) return null;
    if (movie.similar.results.length === 0) return null;

    return (
        <div className={`movie-similar`}>
            <div className={`movie-similar__header`}>
                <h4>{t('similar')}</h4>
                <Link className="link" href={`/similar/${movie.id}`}>
                    More
                </Link>
            </div>

            <List results={movie.similar.results} />
        </div>
    );
};