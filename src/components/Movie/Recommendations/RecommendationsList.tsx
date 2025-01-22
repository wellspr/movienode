"use client";

import { Link } from "@/i18n/routing";
import { MovieDetailsType } from "@/types";
import { List } from "../List";
import { useTranslations } from "next-intl";

export const RecommendationsList = ({
    movie,
}: {
    movie: MovieDetailsType
}) => {

    const t = useTranslations("Movie");

    if (!movie.recommendations) return null;
    if (!movie.recommendations.results) return null;
    if (movie.recommendations.results.length === 0) return null;

    return (
        <div className={`movie-recommendations`}>
            <div className={`movie-recommendations__header`}>
                <h4>{t('recommendations')}</h4>
                <Link
                    className="link"
                    href={`/recommendations/${movie.id}`}>
                    More
                </Link>
            </div>
            
            <List results={movie.recommendations.results} />
        </div>
    );
};